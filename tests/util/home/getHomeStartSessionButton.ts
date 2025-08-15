import { Page } from '@playwright/test';

export function getHomeStartSessionButton(page: Page) {
	return page.getByRole('button', { name: 'Start Session' });
}