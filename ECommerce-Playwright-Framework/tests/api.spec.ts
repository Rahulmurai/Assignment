import { test, expect } from '@playwright/test';

// API contract example using Playwright's request context. The endpoint is public and requires no credentials.
test('@regression public API health and contract validation', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products/1');

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const product = await response.json();
  expect(product).toEqual(expect.objectContaining({
    id: 1,
    title: expect.any(String),
    price: expect.any(Number)
  }));
});
