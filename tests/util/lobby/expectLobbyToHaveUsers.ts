import { expect, Page } from '@playwright/test';

export async function expectLobbyToHaveUsers(page: Page, usernames: string[]) {
	for (const username of usernames) {
		await expect(page.getByText(username)).toBeVisible();
	}
}