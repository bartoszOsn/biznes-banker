import { Page } from '@playwright/test';

export function getLoginSelectMoneyPresetAmountTextboxes(page: Page) {
	return page.getByRole('textbox', { name: 'amount' });
}