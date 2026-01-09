import { Page } from '@playwright/test';

export function getLoginMoneyOnStartTextbox(page: Page) {
	return page.getByRole('textbox', { name: 'Money on start' });
}