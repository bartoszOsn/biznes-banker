import { test } from './fixtures/test';
import { UserDevice } from './fixtures/UserDevice';
import { expect } from '@playwright/test';
import { expectLoginPageVisible } from './util/login/expectLoginPageVisible';
import { clickNextButton } from './util/login/clickNextButton';

test('Smoke test', async ({ users }) => {
	const user1 = await users.create(UserDevice.SamsungGalaxyS24);
	const user2 = await users.create(UserDevice.SamsungGalaxyS24Ultra);
	const user3 = await users.create(UserDevice.Iphone14);
	const user4 = await users.create(UserDevice.SamsungGalaxyS24);

	await test.step('User 1: Start session', async () => {
		await user1.page.goto('/');
		await user1.page.getByRole('button', { name: 'Start Session' }).click();

		await expectLoginPageVisible(user1.page);
	});

	await test.step('User 1: Login', async () => {
		await clickNextButton(user1.page);

		await expect(user1.page.getByText('Choose your name')).toHaveCSS('animation-name', 'shake');
		await expect(user1.page.getByText('Select a color')).toHaveCSS('animation-name', 'shake');

		await user1.page.getByRole('textbox').fill('User 1');
		await clickNextButton(user1.page);

		await expect(user1.page.getByText('Select a color')).toHaveCSS('animation-name', 'shake');
		await expect(user1.page.getByText('Choose your name')).not.toHaveCSS('animation-name', 'shake');

		await user1.page.locator('button:nth-child(2)').click(); // TODO: add testIds to buttons
		await clickNextButton(user1.page);

		await expect(user1.page.getByText('Waiting for other players')).toBeVisible();
	});

	const joinSessionLink = await test.step('copy join session link', async () => {
		await user1.browserContext.grantPermissions(["clipboard-read", "clipboard-write"]);

		await user1.page.getByRole('button', { name: 'Copy link' }).click();
		const link = await user1.page.evaluate(() => navigator.clipboard.readText());

		expect(link).toContain('http://127.0.0.1:5000/?s=');
		return link;
	});

	await test.step('User 2: Join session and login', async () => {
		await user2.page.goto(joinSessionLink);

		await expectLoginPageVisible(user2.page);

		await user2.page.getByRole('textbox').fill('User 2');
		await user2.page.locator('button:nth-child(7)').click(); // TODO: add testIds to buttons
		await clickNextButton(user2.page);

		await expect(user2.page.getByText('Waiting for other players')).toBeVisible();
	});

	await test.step('User 3: Join session and login', async () => {
		await user3.page.goto(joinSessionLink);

		await expectLoginPageVisible(user3.page);

		await user3.page.getByRole('textbox').fill('User 3');
		await user3.page.locator('button:nth-child(8)').click(); // TODO: add testIds to buttons
		await clickNextButton(user3.page);

		await expect(user3.page.getByText('Waiting for other players')).toBeVisible();
	});

	await test.step('User 4: Join session and login', async () => {
		await user4.page.goto(joinSessionLink);

		await expectLoginPageVisible(user4.page);

		await user4.page.getByRole('textbox').fill('User 4');
		await user4.page.locator('button:nth-child(3)').click(); // TODO: add testIds to buttons
		await clickNextButton(user4.page);

		await expect(user4.page.getByText('Waiting for other players')).toBeVisible();

		await expect(user4.page.getByText('User 1')).toBeVisible();
		await expect(user4.page.getByText('User 2')).toBeVisible();
		await expect(user4.page.getByText('User 3')).toBeVisible();
		await expect(user4.page.getByText('User 4')).toBeVisible();
	});
})