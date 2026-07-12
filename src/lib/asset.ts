// Prefix a public/ path with the site base (works locally and on GitHub Pages).
const base = import.meta.env.BASE_URL;

export const asset = (path: string): string =>
	`${base.endsWith('/') ? base : `${base}/`}${path.replace(/^\//, '')}`;
