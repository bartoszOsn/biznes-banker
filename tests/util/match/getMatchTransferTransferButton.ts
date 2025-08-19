import { Page } from '@playwright/test';

export function getMatchTransferTransferButton(page: Page) {
	return page.getByRole('button', { name: 'Transfer' });
}