import { Page } from '@playwright/test';

export function getMatchHideMoneyButton(page: Page) {
	return page.getByRole('button', { name: 'Click to hide' });
}