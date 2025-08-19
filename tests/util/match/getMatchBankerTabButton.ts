import { Page } from '@playwright/test';

export function getMatchBankerTabButton(page: Page) {
	return page.getByRole('banner')
		.getByRole('button', { name: 'Banker' });
}