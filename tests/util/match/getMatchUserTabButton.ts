import { Page } from '@playwright/test';

export function getMatchUserTabButton(username: string, page: Page) {
	return page.getByRole('banner')
		.getByRole('button', { name: username });
}