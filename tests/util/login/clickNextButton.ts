import { Page } from '@playwright/test';

export async function clickNextButton(page: Page): Promise<void> {
	await page.getByRole('button', { name: 'Next' }).click();
}