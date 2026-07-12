import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Work panel: one .md file per project in src/content/projects/.
// Each project shows as a card in the Work grid and gets its own detail panel
// (opened with the same slide animation). The markdown body is the in-depth write-up.
const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(), // used for the detail panel's #project-<slug> anchor
		cardImage: z.string(), // thumbnail shown on the grid card, e.g. "images/pic02.jpg"
		alt: z.string().default(''),
		summary: z.string().default(''), // short line shown at the top of the detail panel
		tags: z.array(z.string()).default([]), // tech & tools, e.g. ["Java", "Design"]
		gallery: z
			.array(
				z.object({
					src: z.string(), // path under public/, e.g. "images/uno-1.png"
					alt: z.string().default(''),
					type: z.enum(['image', 'video']).default('image'),
				}),
			)
			.default([]),
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
