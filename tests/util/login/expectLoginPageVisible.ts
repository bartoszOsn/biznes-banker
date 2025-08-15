import { expect, Page } from '@playwright/test';
import { getLoginNextButton } from './getLoginNextButton';

export async function expectLoginPageVisible(page: Page): Promise<void> {
	await expect(page.getByText('Choose your name')).toBeVisible();
	await expect(page.getByText('Select a color')).toBeVisible();
	await expect(getLoginNextButton(page)).toBeVisible();
}