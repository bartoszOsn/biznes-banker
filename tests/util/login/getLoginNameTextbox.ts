import { Page } from '@playwright/test';

export function getLoginNameTextbox(page: Page) {
	return page.getByRole('textbox');
}