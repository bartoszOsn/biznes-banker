import { Page } from '@playwright/test';

export function getLoginSelectMoneyPresetTitleTextboxes(page: Page) {
	return page.getByRole('textbox', { name: 'preset name' });
}