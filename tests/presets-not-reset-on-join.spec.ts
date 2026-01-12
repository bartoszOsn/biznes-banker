import { test } from './fixtures/test';
import { UserDevice } from './fixtures/UserDevice';
import { goToHome } from './util/home/goToHome';
import { getHomeStartSessionButton } from './util/home/getHomeStartSessionButton';
import { expectLoginPageVisible } from './util/login/expectLoginPageVisible';
import { getLoginContinueButton } from './util/login/getLoginContinueButton';
import { getLoginNameTextbox } from './util/login/getLoginNameTextbox';
import { getLoginColorButton } from './util/login/getLoginColorButton';
import { expectLobbyPageVisible } from './util/lobby/expectLobbyPageVisible';
import { expectLobbyToHaveUsers } from './util/lobby/expectLobbyToHaveUsers';
import { expect } from '@playwright/test';
import { getLoginMoneyOnStartTextbox } from './util/login/getLoginMoneyOnStartTextbox';
import { getLoginSelectMoneyAddPresetButton } from './util/login/getLoginSelectMoneyAddPresetButton';
import { getLoginSelectMoneyPresetTitleTextboxes } from './util/login/getLoginSelectMoneyPresetTitleTextboxes';
import { getLoginSelectMoneyPresetAmountTextboxes } from './util/login/getLoginSelectMoneyPresetAmountTextboxes';
import { copyJoinURL } from './util/lobby/copyJoinURL';

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
		await getLoginContinueButton(user1.page).click();

		await expectLobbyPageVisible(user1.page);
		await expectLobbyToHaveUsers(user1.page, ['User 1']);
	});

	const joinSessionLink = await test.step('User 1: copy join session link', async () => {
		const link = await copyJoinURL(user1);

		expect(link).toContain('http://127.0.0.1:5000/?s=');
		return link;
	});

	await test.step('User 1: Start setting presets', async () => {
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
		await getLoginContinueButton(user2.page).click();

		await expectLobbyPageVisible(user2.page);
		await expectLobbyToHaveUsers(user2.page, ['User 1', 'User 2']);
	});

	await test.step('User 1: Presets are still set', async () => {
		await expect(getLoginSelectMoneyPresetTitleTextboxes(user1.page).nth(0)).toHaveValue('Preset 1');
		await expect(getLoginSelectMoneyPresetAmountTextboxes(user1.page).nth(0)).toHaveValue('$100');
	});
});