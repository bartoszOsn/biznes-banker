import { expect, Page } from '@playwright/test';

export async function expectMatchPageVisible(page: Page) {
	await expect(page.locator('.mantine-AppShell-root')).toBeVisible();
}