export interface FormSubmitOptions {
  formId: string;
  statusId: string;
  posthogEvent?: string;
  posthogProps?: () => Record<string, unknown>;
}

export function initContactForm(options: FormSubmitOptions) {
  const form = document.getElementById(options.formId) as HTMLFormElement | null;
  const status = document.getElementById(options.statusId);

  if (!form || !status) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const accessKey = formData.get("access_key") as string;

    if (!accessKey) {
      status.innerHTML = "⚠️ Form not configured. Please add WEB3FORMS_KEY to environment variables.";
      status.style.color = "#ff4444";
      return;
    }

    const button = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = button.textContent;
    button.textContent = "Sending...";
    button.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        status.innerHTML = "✓ Message sent successfully! We'll get back to you soon.";
        status.style.color = "#00FF88";
        form.reset();

        if (options.posthogEvent && window.posthog) {
          window.posthog.capture(options.posthogEvent, options.posthogProps?.());
        }
      } else {
        throw new Error(data.message || "Form submission failed");
      }
    } catch (error) {
      status.innerHTML = "❌ Something went wrong. Please try again.";
      status.style.color = "#ff4444";
      console.error("Form error:", error);
    } finally {
      button.textContent = originalText;
      button.disabled = false;
    }
  });
}
