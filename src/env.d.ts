/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  posthog?: any;
}

interface ImportMetaEnv {
  readonly PUBLIC_POSTHOG_KEY: string;
  readonly PUBLIC_POSTHOG_HOST: string;
  readonly PUBLIC_WEB3FORMS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
