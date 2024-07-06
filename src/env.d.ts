/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly COMMIT_HASH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
