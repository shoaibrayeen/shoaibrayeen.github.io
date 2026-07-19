/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms access key for the contact form (Contact.tsx). CI: GitHub Actions secret; local: .env.local. */
  readonly VITE_WEB3FORMS_ACCESS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
