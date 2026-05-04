import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { appRegistry } from "./apps/index";

export default function Portal() {
  const [phase, setPhase] = useState("loading");
  const [App, setApp] = useState(null);

  useEffect(() => {
    async function resolve() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data: client } = await supabase
        .from("clients")
        .select("slug, name")
        .eq("user_id", user.id)
        .single();

      if (!client) { setPhase("no-client"); return; }

      const component = appRegistry[client.slug];
      if (!component) { setPhase("no-app"); return; }

      setApp(() => component);
      setPhase("ready");
    }

    resolve();
  }, []);

  if (phase === "loading") return <StatusLine text="resolving session..." />;
  if (phase === "no-client") return <StatusLine text="no client record — " error />;
  if (phase === "no-app") return <StatusLine text="app not configured — " error />;
  if (phase === "ready" && App) return <App />;
  return null;
}

function StatusLine({ text, error = false }) {
  return (
    <div className="portal-status">
      <p className="portal-line">
        <span className="portal-prompt">›</span>
        <span className={error ? "portal-error-text" : "portal-command"}>
          {text}{error && <a href="mailto:support@gntr.io" className="portal-support">contact support</a>}
        </span>
        {!error && <span className="portal-cursor">_</span>}
      </p>
      {error && <a href="/login" className="portal-back">← back to login</a>}
    </div>
  );
}
