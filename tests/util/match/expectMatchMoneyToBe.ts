import { expect, Page } from '@playwright/test';

export async function expectMatchMoneyToBe(amount: string, page: Page) {
  await expect(page.getByRole('button', { name: 'Click to hide' })).toContainText(amount);
}