import { Page } from '@playwright/test';

export function getLoginSelectMoneyPresetsSaveButton(page: Page) {
	return page.getByRole('button', {name: 'Save'});
}