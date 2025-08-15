import { Page } from '@playwright/test';

export function goToHome(page: Page) {
	  return page.goto('/');
}