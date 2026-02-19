import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		featured: z.boolean().default(false),
		date: z.string().optional(),
		links: z
			.object({
				demo: z.string().url().optional(),
				repo: z.string().url().optional(),
			})
			.optional(),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = { projects };
