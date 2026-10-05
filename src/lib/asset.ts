/** Prefix a /public file with the deploy base path (e.g. "/Portfolio" on GitHub Pages project sites). */
export const asset = (file: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/${file}`;
