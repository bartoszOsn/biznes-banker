import { test as baseTest } from '@playwright/test';
import { UserManager, UserManagerImpl } from './UserManager';

export const test = baseTest.extend<{ users: UserManager }>({
	users: async ({launchOptions}, use) => {
		const userManager = new UserManagerImpl(launchOptions);
		await use(userManager);
		await userManager.dispose();
	}
})