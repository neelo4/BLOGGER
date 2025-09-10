import { test, expect } from '@playwright/test';

test('loads dashboard', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'ICB' })).toBeVisible();
  await expect(page.getByText('Dashboard')).toBeVisible();
});

