import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Work panel: one .md file per project in src/content/projects/.
// The markdown body is the project description (links allowed).
const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		image: z.string(), // path under public/, e.g. "images/pic02.jpg"
		alt: z.string().default(''),
		// image-right: text left, image right   | image-left: image left, text right
		// center:      image centered, caption  | full: full-width image, caption below
		layout: z.enum(['image-right', 'image-left', 'center', 'full']).default('image-right'),
		order: z.number().default(999),
	}),
});

// Friends panel: one .md file per friend in src/content/friends/.
const friends = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/friends' }),
	schema: z.object({
		name: z.string(),
		image: z.string(),
		url: z.string().url(),
		order: z.number().default(999),
	}),
});

export const collections = { projects, friends };
