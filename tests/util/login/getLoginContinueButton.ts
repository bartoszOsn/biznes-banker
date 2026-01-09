import { Page } from '@playwright/test';

export function getLoginContinueButton(page: Page) {
	return page.getByRole('button', { name: 'Continue' });
}