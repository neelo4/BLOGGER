import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/queryClient';
import { router } from '@/shared/router/router';
import '@/styles/index.css';
import '@/styles/tokens.css';
import { worker } from '@/shared/mocks/browser';

// Start MSW for local development to simulate microservices
if (import.meta.env.DEV) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  worker.start({ onUnhandledRequest: 'bypass' });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
);

