import { Page } from '@playwright/test';

export function getLoginNextButton(page: Page) {
	return page.getByRole('button', { name: 'Next' });
}