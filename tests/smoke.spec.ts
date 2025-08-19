import { test } from './fixtures/test';
import { UserDevice } from './fixtures/UserDevice';
import { expect } from '@playwright/test';
import { expectLoginPageVisible } from './util/login/expectLoginPageVisible';
import { getLoginNextButton } from './util/login/getLoginNextButton';
import { goToHome } from './util/home/goToHome';
import { getHomeStartSessionButton } from './util/home/getHomeStartSessionButton';
import { expectLoginChooseNameLabelToBeShaking } from './util/login/expectLoginChooseNameLabelToBeShaking';
import { expectLoginChooseColorLabelToBeShaking } from './util/login/expectLoginChooseColorLabelToBeShaking';
import { getLoginNameTextbox } from './util/login/getLoginNameTextbox';
import { expectLoginChooseNameLabelNotToBeShaking } from './util/login/expectLoginChooseNameLabelNotToBeShaking';
import { expectLobbyPageVisible } from './util/lobby/expectLobbyPageVisible';
import { expectLobbyToHaveUsers } from './util/lobby/expectLobbyToHaveUsers';
import { expectMatchPageVisible } from './util/match/expectMatchPageVisible';
import { getMatchRevealMoneyButton } from './util/match/getMatchRevealMoneyButton';
import { expectMatchMoneyToBe } from './util/match/expectMatchMoneyToBe';
import { getLoginSelectMoneyPresetsButton } from './util/login/getLoginSelectMoneyPresetsButton';
import { getLoginMoneyOnStartTextbox } from './util/login/getLoginMoneyOnStartTextbox';
import { getLoginSelectMoneyPresetsSaveButton } from './util/login/getLoginSelectMoneyPresetsSaveButton';

test('Smoke test', async ({ users }) => {
	const user1 = await users.create(UserDevice.SamsungGalaxyS24);
	const user2 = await users.create(UserDevice.SamsungGalaxyS24Ultra);
	const user3 = await users.create(UserDevice.Iphone14);
	const user4 = await users.create(UserDevice.SamsungGalaxyS24);

	await test.step('User 1: Start session', async () => {
		await goToHome(user1.page);
		await getHomeStartSessionButton(user1.page).click();

		await expectLoginPageVisible(user1.page);
	});

	await test.step('User 1: Login', async () => {
		await getLoginNextButton(user1.page).click();

		await expectLoginChooseNameLabelToBeShaking(user1.page);
		await expectLoginChooseColorLabelToBeShaking(user1.page);

		await getLoginNameTextbox(user1.page).fill('User 1');
		await getLoginNextButton(user1.page).click();

		await expectLoginChooseColorLabelToBeShaking(user1.page);
		await expectLoginChooseNameLabelNotToBeShaking(user1.page);

		await user1.page.locator('button:nth-child(2)').click(); // TODO: add testIds to buttons
		await getLoginNextButton(user1.page).click();

		await expectLobbyPageVisible(user1.page);
		await expectLobbyToHaveUsers(user1.page, ['User 1']);
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

		await getLoginNameTextbox(user2.page).fill('User 2');
		await user2.page.locator('button:nth-child(7)').click(); // TODO: add testIds to buttons
		await getLoginNextButton(user2.page).click();

		await expectLobbyPageVisible(user2.page);
		await expectLobbyToHaveUsers(user2.page, ['User 1', 'User 2']);
	});

	await test.step('User 3: Join session and login', async () => {
		await user3.page.goto(joinSessionLink);

		await expectLoginPageVisible(user3.page);

		await getLoginNameTextbox(user3.page).fill('User 3');
		await user3.page.locator('button:nth-child(8)').click(); // TODO: add testIds to buttons
		await getLoginNextButton(user3.page).click();

		await expectLobbyPageVisible(user3.page);
		await expectLobbyToHaveUsers(user3.page, ['User 1', 'User 2', 'User 3']);
	});

	await test.step('User 4: Join session and login', async () => {
		await user4.page.goto(joinSessionLink);

		await expectLoginPageVisible(user4.page);

		await getLoginNameTextbox(user4.page).fill('User 4');
		await user4.page.locator('button:nth-child(3)').click(); // TODO: add testIds to buttons
		await getLoginNextButton(user4.page).click();

		await expectLobbyPageVisible(user4.page);
		await users.forEach(page => expectLobbyToHaveUsers(page, ['User 1', 'User 2', 'User 3', 'User 4']));
	});

	await test.step('User 1: Setup $100 as starting money', async () => {
		await getLoginSelectMoneyPresetsButton(user1.page).click();
		await getLoginMoneyOnStartTextbox(user1.page).fill('100');
		await getLoginSelectMoneyPresetsSaveButton(user1.page).click();
	});

	await test.step('user 1: Start game', async () => {
		await user1.page.getByRole('button', { name: 'Play' }).click();

		await users.forEach(page => expectMatchPageVisible(page));
	});

	await test.step('View money amount for each user', async () => {
		await users.forEach(async (page) => {
			await getMatchRevealMoneyButton(page).click();
			await expectMatchMoneyToBe('$100', page);
		});
	})
})