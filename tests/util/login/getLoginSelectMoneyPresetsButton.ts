import { Page } from '@playwright/test';

export function getLoginSelectMoneyPresetsButton(page: Page) {
	return page.getByTestId('money-preset-button');
}