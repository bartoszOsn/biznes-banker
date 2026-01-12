import { test } from './fixtures/test';
import { UserDevice } from './fixtures/UserDevice';
import { expect } from '@playwright/test';
import { expectLoginPageVisible } from './util/login/expectLoginPageVisible';
import { getLoginContinueButton } from './util/login/getLoginContinueButton';
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
import { getLoginMoneyOnStartTextbox } from './util/login/getLoginMoneyOnStartTextbox';
import { getMatchHideMoneyButton } from './util/match/getMatchHideMoneyButton';
import { getMatchTransferButtonToUser } from './util/match/getMatchTransferButtonToUser';
import { getMatchTransferAmountTextbox } from './util/match/getMatchTransferAmountTextbox';
import { getMatchTransferTransferButton } from './util/match/getMatchTransferTransferButton';
import { getMatchBankerTabButton } from './util/match/getMatchBankerTabButton';
import { getMatchUserTabButton } from './util/match/getMatchUserTabButton';
import { getLoginColorButton } from './util/login/getLoginColorButton';
import { copyJoinURL } from './util/lobby/copyJoinURL';

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
		await getLoginContinueButton(user1.page).click();

		await expectLoginChooseNameLabelToBeShaking(user1.page);
		await expectLoginChooseColorLabelToBeShaking(user1.page);

		await getLoginNameTextbox(user1.page).fill('User 1');
		await getLoginContinueButton(user1.page).click();

		await expectLoginChooseColorLabelToBeShaking(user1.page);
		await expectLoginChooseNameLabelNotToBeShaking(user1.page);

		await getLoginColorButton('blue', user1.page).click();
		await getLoginContinueButton(user1.page).click();

		await expectLobbyPageVisible(user1.page);
		await expectLobbyToHaveUsers(user1.page, ['User 1']);
	});

	const joinSessionLink = await test.step('copy join session link', async () => {
		const link = await copyJoinURL(user1);

		expect(link).toContain('http://127.0.0.1:5000/?s=');
		return link;
	});

	await test.step('User 2: Join session and login', async () => {
		await user2.page.goto(joinSessionLink);

		await expectLoginPageVisible(user2.page);

		await getLoginNameTextbox(user2.page).fill('User 2');
		await getLoginColorButton('white', user2.page).click();
		await getLoginContinueButton(user2.page).click();

		await expectLobbyPageVisible(user2.page);
		await expectLobbyToHaveUsers(user2.page, ['User 1', 'User 2']);
	});

	await test.step('User 3: Join session and login', async () => {
		await user3.page.goto(joinSessionLink);

		await expectLoginPageVisible(user3.page);

		await getLoginNameTextbox(user3.page).fill('User 3');
		await getLoginColorButton('black', user3.page).click();
		await getLoginContinueButton(user3.page).click();

		await expectLobbyPageVisible(user3.page);
		await expectLobbyToHaveUsers(user3.page, ['User 1', 'User 2', 'User 3']);
	});

	await test.step('User 4: Join session and login', async () => {
		await user4.page.goto(joinSessionLink);

		await expectLoginPageVisible(user4.page);

		await getLoginNameTextbox(user4.page).fill('User 4');
		await getLoginColorButton('green', user4.page).click();
		await getLoginContinueButton(user4.page).click();

		await expectLobbyPageVisible(user4.page);
		await users.forEach(page => expectLobbyToHaveUsers(page, ['User 1', 'User 2', 'User 3', 'User 4']));
	});

	await test.step('User 1: Setup $100 as starting money', async () => {
		await getLoginMoneyOnStartTextbox(user1.page).fill('100');
	});

	await test.step('User 1: Start game', async () => {
		await user1.page.getByRole('button', { name: 'Play' }).click();

		await users.forEach(page => expectMatchPageVisible(page));
	});

	await test.step('View money amount for each user', async () => {
		await users.forEach(async (page) => {
			await getMatchRevealMoneyButton(page).click();
			await expectMatchMoneyToBe('$100', page);
			await getMatchHideMoneyButton(page).click();
		});
	});

	await test.step('user 1: transfer $20 to user 2', async () => {
		await getMatchTransferButtonToUser('User 2', user1.page).click();
		await getMatchTransferAmountTextbox(user1.page).fill('20');
		await getMatchTransferTransferButton(user1.page).click();

		await getMatchRevealMoneyButton(user1.page).click();
		await expectMatchMoneyToBe('$80', user1.page);
		await getMatchHideMoneyButton(user1.page).click();

		await getMatchRevealMoneyButton(user2.page).click();
		await expectMatchMoneyToBe('$120', user2.page);
		await getMatchHideMoneyButton(user2.page).click();
	});

	await test.step('user 2: transfer $30 to banker', async () => {
		await getMatchTransferButtonToUser('Banker', user2.page).click();
		await getMatchTransferAmountTextbox(user2.page).fill('30');
		await getMatchTransferTransferButton(user2.page).click();

		await getMatchRevealMoneyButton(user2.page).click();
		await expectMatchMoneyToBe('$90', user2.page);
		await getMatchHideMoneyButton(user2.page).click();
	});

	await test.step('user 1: transfer $10 to user 3 as banker', async () => {
		await getMatchBankerTabButton(user1.page).click();

		await getMatchTransferButtonToUser('User 3', user1.page).click();
		await getMatchTransferAmountTextbox(user1.page).fill('10');
		await getMatchTransferTransferButton(user1.page).click();

		await getMatchUserTabButton('User 1', user1.page).click();

		await getMatchRevealMoneyButton(user1.page).click();
		await expectMatchMoneyToBe('$80', user1.page);
		await getMatchHideMoneyButton(user1.page).click();

		await getMatchRevealMoneyButton(user3.page).click();
		await expectMatchMoneyToBe('$110', user3.page);
		await getMatchHideMoneyButton(user3.page).click();
	});
});
