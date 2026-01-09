import { Page } from '@playwright/test';

export function getLoginSelectMoneyAddPresetButton(page: Page) {
	return page.getByRole('button', { name: 'Add preset' });
}