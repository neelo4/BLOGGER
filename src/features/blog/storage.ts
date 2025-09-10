import { Post, PostZ } from './types';
import { v4 as uuid } from 'uuid';

const KEY = 'icb_blog_posts_v1';

function read(): Post[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed();
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) throw new Error('not array');
    return arr.map(p => PostZ.parse(p));
  } catch {
    return seed();
  }
}

function write(posts: Post[]) {
  localStorage.setItem(KEY, JSON.stringify(posts));
}

function seed(): Post[] {
  const now = new Date().toISOString();
  const demo: Post[] = [
    {
      id: uuid(),
      title: 'Welcome to your new blog',
      content: '# Hello!\n\nThis is a demo blog built with React + TypeScript.\n\n- Write in Markdown\n- Preview live\n- Persist locally (no backend needed)\n\nHappy writing!',
      tags: ['welcome', 'demo'],
      published: true,
      createdAt: now,
      updatedAt: now
    }
  ];
  write(demo);
  return demo;
}

export const BlogStore = {
  list(): Post[] {
    const posts = read();
    return posts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  },

  get(id: string): Post | undefined {
    return read().find(p => p.id === id);
  },

  create(input: Pick<Post, 'title' | 'content' | 'tags' | 'published'>): Post {
    const posts = read();
    const now = new Date().toISOString();
    const post: Post = { id: uuid(), createdAt: now, updatedAt: now, ...input };
    posts.unshift(post);
    write(posts);
    return post;
  },

  update(id: string, patch: Partial<Pick<Post, 'title' | 'content' | 'tags' | 'published'>>): Post | undefined {
    const posts = read();
    const i = posts.findIndex(p => p.id === id);
    if (i === -1) return undefined;
    posts[i] = { ...posts[i], ...patch, updatedAt: new Date().toISOString() };
    write(posts);
    return posts[i];
  },

  remove(id: string) {
    const posts = read().filter(p => p.id !== id);
    write(posts);
  },

  export(): string {
    return JSON.stringify(read(), null, 2);
  },

  import(json: string) {
    const arr = JSON.parse(json);
    if (!Array.isArray(arr)) throw new Error('Invalid import');
    const posts = arr.map(x => PostZ.parse(x));
    write(posts);
  }
};

