import { Page } from '@playwright/test';

export function getMatchRevealMoneyButton(page: Page) {
	return page.getByRole('button', { name: 'Click to show' });
}