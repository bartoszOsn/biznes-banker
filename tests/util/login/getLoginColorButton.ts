import { Page } from '@playwright/test';

export function getLoginColorButton(color: string, page: Page) {
	return page.getByRole('button', { name: color });
}