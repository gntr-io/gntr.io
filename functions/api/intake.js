export async function onRequestPost({ request, env }) {
  const { email, room_types, services, material_mode, material_notes } = await request.json();

  const serviceList = services
    .filter((s) => s.name)
    .map((s) => `<li>${s.name}${s.unit ? ` — ${s.unit}` : ""}${s.unit_price ? ` @ ${s.unit_price}` : ""}</li>`)
    .join("");

  const html = `
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Rooms:</strong> ${(room_types || []).join(", ")}</p>
    <p><strong>Services:</strong></p><ul>${serviceList}</ul>
    <p><strong>Materials:</strong> ${material_mode}</p>
    ${material_notes ? `<p><strong>Notes:</strong> ${material_notes}</p>` : ""}
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "hello@gntr.io",
      to: ["hello@gntr.io"],
      reply_to: email,
      subject: `New intake submission — ${email}`,
      html,
    }),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
