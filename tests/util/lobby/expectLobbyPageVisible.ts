import { expect, Page } from '@playwright/test';

export async function expectLobbyPageVisible(page: Page) {
	await expect(page.getByText('Waiting for other players')).toBeVisible();
}