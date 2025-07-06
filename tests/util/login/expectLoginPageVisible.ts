import { expect, Page } from '@playwright/test';

export async function expectLoginPageVisible(page: Page): Promise<void> {
	await expect(page.getByText('Choose your name')).toBeVisible();
	await expect(page.getByText('Select a color')).toBeVisible();
	await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
}