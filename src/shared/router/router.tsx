import { lazy } from 'react';
import { createBrowserRouter, defer } from 'react-router-dom';
import { RootLayout } from '@/shared/ui/RootLayout';
import { fetchHealth } from '@/shared/services/health';

const BlogHomePage = lazy(() => import('@/pages/BlogHomePage'));
const BlogEditorPage = lazy(() => import('@/pages/BlogEditorPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    loader: () => defer({ health: fetchHealth() }),
    children: [
      { index: true, element: <BlogHomePage /> },
      { path: 'editor/:id', element: <BlogEditorPage /> },
      { path: 'post/:id', element: <BlogPostPage /> }
    ]
  }
]);
