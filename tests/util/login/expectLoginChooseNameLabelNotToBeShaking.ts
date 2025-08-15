import { expect, Page } from '@playwright/test';

export async function expectLoginChooseNameLabelNotToBeShaking(page: Page) {
	await expect(page.getByText('Choose your name')).not.toHaveCSS('animation-name', 'shake');
}