import { test } from './fixtures/test';
import { UserDevice } from './fixtures/UserDevice';
import { goToHome } from './util/home/goToHome';
import { getHomeStartSessionButton } from './util/home/getHomeStartSessionButton';
import { expectLoginPageVisible } from './util/login/expectLoginPageVisible';
import { getLoginNextButton } from './util/login/getLoginNextButton';
import { expectLoginChooseNameLabelToBeShaking } from './util/login/expectLoginChooseNameLabelToBeShaking';
import { expectLoginChooseColorLabelToBeShaking } from './util/login/expectLoginChooseColorLabelToBeShaking';
import { getLoginNameTextbox } from './util/login/getLoginNameTextbox';
import { expectLoginChooseNameLabelNotToBeShaking } from './util/login/expectLoginChooseNameLabelNotToBeShaking';
import { getLoginColorButton } from './util/login/getLoginColorButton';
import { expectLobbyPageVisible } from './util/lobby/expectLobbyPageVisible';
import { expectLobbyToHaveUsers } from './util/lobby/expectLobbyToHaveUsers';
import { expect } from '@playwright/test';
import { getLoginSelectMoneyPresetsButton } from './util/login/getLoginSelectMoneyPresetsButton';
import { getLoginMoneyOnStartTextbox } from './util/login/getLoginMoneyOnStartTextbox';
import { getLoginSelectMoneyAddPresetButton } from './util/login/getLoginSelectMoneyAddPresetButton';
import { getLoginSelectMoneyPresetTitleTextboxes } from './util/login/getLoginSelectMoneyPresetTitleTextboxes';
import { getLoginSelectMoneyPresetAmountTextboxes } from './util/login/getLoginSelectMoneyPresetAmountTextboxes';

test('Presets are not reset when a new user joins a session', async ({ users }) => {
	const user1 = await users.create(UserDevice.SamsungGalaxyS24);
	const user2 = await users.create(UserDevice.SamsungGalaxyS24Ultra);

	await test.step('User 1: Start session', async () => {
		await goToHome(user1.page);
		await getHomeStartSessionButton(user1.page).click();

		await expectLoginPageVisible(user1.page);
	});

	await test.step('User 1: Login', async () => {
		await getLoginNameTextbox(user1.page).fill('User 1');
		await getLoginColorButton('blue', user1.page).click();
		await getLoginNextButton(user1.page).click();

		await expectLobbyPageVisible(user1.page);
		await expectLobbyToHaveUsers(user1.page, ['User 1']);
	});

	const joinSessionLink = await test.step('User 1: copy join session link', async () => {
		await user1.browserContext.grantPermissions(["clipboard-read", "clipboard-write"]);

		await user1.page.getByRole('button', { name: 'Copy link' }).click();
		const link = await user1.page.evaluate(() => navigator.clipboard.readText());

		expect(link).toContain('http://127.0.0.1:5000/?s=');
		return link;
	});

	await test.step('User 1: Start setting presets', async () => {
		await getLoginSelectMoneyPresetsButton(user1.page).click();
		await getLoginMoneyOnStartTextbox(user1.page).fill('100');
		await getLoginSelectMoneyAddPresetButton(user1.page).click();
		await getLoginSelectMoneyPresetTitleTextboxes(user1.page).nth(0).fill('Preset 1');
		await getLoginSelectMoneyPresetAmountTextboxes(user1.page).nth(0).fill('100');

		await expect(getLoginSelectMoneyPresetTitleTextboxes(user1.page).nth(0)).toHaveValue('Preset 1');
		await expect(getLoginSelectMoneyPresetAmountTextboxes(user1.page).nth(0)).toHaveValue('$100');
	});

	await test.step('User 2: Join session', async () => {
		await user2.page.goto(joinSessionLink);

		await expectLoginPageVisible(user2.page);
	});

	await test.step('User 2: Login', async () => {
		await getLoginNameTextbox(user2.page).fill('User 2');
		await getLoginColorButton('red', user2.page).click();
		await getLoginNextButton(user2.page).click();

		await expectLobbyPageVisible(user2.page);
		await expectLobbyToHaveUsers(user2.page, ['User 1', 'User 2']);
	});

	await test.step('User 1: Presets are still set', async () => {
		await expect(getLoginSelectMoneyPresetTitleTextboxes(user1.page).nth(0)).toHaveValue('Preset 1');
		await expect(getLoginSelectMoneyPresetAmountTextboxes(user1.page).nth(0)).toHaveValue('$100');
	});
});