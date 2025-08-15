import { Browser, BrowserContext, LaunchOptions, Page, test, } from '@playwright/test';
import { UserDevice, userDeviceToBrowserType, userDeviceToDeviceDescriptor } from './UserDevice';

export abstract class UserManager {
	abstract create(device: UserDevice): Promise<UserContext>;
	abstract forEach(callback: (page: Page, browserContext: BrowserContext, browser: Browser) => Promise<void>): Promise<void>;
}

export interface UserContext {
	page: Page,
	browserContext: BrowserContext,
	browser: Browser;
}

export class UserManagerImpl extends UserManager {
	private contexts: Array<UserContext> = [];

	constructor(private readonly launchOptions: LaunchOptions) {
		super();
	}

    async create(device: UserDevice): Promise<UserContext> {
		return test.step(`create user for device: ${device}`, async () => {
			const context = await this.createContext(device);
			this.contexts.push(context);
			return context;
		});
    }

	async forEach(callback: (page: Page, browserContext: BrowserContext, browser: Browser) => Promise<void>): Promise<void> {
		for (const context of this.contexts) {
			await callback(context.page, context.browserContext, context.browser);
		}
	}

	async dispose(): Promise<void> {
		for (const context of this.contexts) {
			await context.page.close();
			await context.browserContext.close();
			await context.browser.close();
		}
		this.contexts.length = 0;
	}

	private async createContext(device: UserDevice): Promise<UserContext> {
		const browserType = userDeviceToBrowserType[device];
		if (!browserType) {
			throw new Error(`Unsupported device: ${device}`);
		}

		const browser = await browserType.launch(this.launchOptions);
		const browserContext = await browser.newContext({
			...userDeviceToDeviceDescriptor[device],
		});
		const page = await browserContext.newPage();
		await page.addInitScript(() => {
			const oldAppendChild = Element.prototype.appendChild;
			Element.prototype.appendChild = function (element) {
				if (element instanceof HTMLCanvasElement) {
					return element;
				}
				return oldAppendChild.call(this, element);
			};
		})

		return { page, browserContext, browser };
	}
}