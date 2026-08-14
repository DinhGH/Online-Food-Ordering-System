import { test, expect } from '@playwright/test';

test('api server health check', async ({ request }) => {
  const response = await request.get('http://localhost:3000/');
  expect(response.ok()).toBeTruthy();
  expect(await response.text()).toBe('API server is running...');
});

test('get food items', async ({ request }) => {
  const response = await request.get('http://localhost:3000/api/food-items');
  expect(response.ok()).toBeTruthy();
});