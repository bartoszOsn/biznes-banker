import { expect, Page } from '@playwright/test';

export async function expectLoginChooseNameLabelToBeShaking(page: Page) {
	await expect(page.getByText('Choose your name')).toHaveCSS('animation-name', 'shake');
}