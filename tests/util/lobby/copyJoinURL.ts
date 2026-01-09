import { UserContext } from '../../fixtures/UserManager';

export async function copyJoinURL(user: UserContext) {
	await user.browserContext.grantPermissions(["clipboard-read", "clipboard-write"]);

	await user.page.getByTestId('QR-copy-button').click();
	return await user.page.evaluate(() => navigator.clipboard.readText());
}