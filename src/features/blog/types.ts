import { z } from 'zod';

export const PostZ = z.object({
  id: z.string(),
  title: z.string().min(1),
  content: z.string().default(''),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(true),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type Post = z.infer<typeof PostZ>;

