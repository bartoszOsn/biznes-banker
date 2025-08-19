import { Page } from '@playwright/test';

export function getLoginSelectMoneyPresetsButton(page: Page) {
	return page.getByRole('button', { name: 'Select money presets' });
}