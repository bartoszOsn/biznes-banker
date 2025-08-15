import { expect, Page } from '@playwright/test';

export async function expectLoginChooseColorLabelToBeShaking(page: Page) {
	await expect(page.getByText('Select a color')).toHaveCSS('animation-name', 'shake');
}