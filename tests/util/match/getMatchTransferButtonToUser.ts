import { Page } from '@playwright/test';

export function getMatchTransferButtonToUser(username: string, page: Page) {
	return page.getByRole('button', { name: username });
}