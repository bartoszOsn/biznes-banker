import { Page } from '@playwright/test';

export function getMatchTransferAmountTextbox(page: Page) {
	return page.getByRole('textbox', { name: 'Amount' });
}