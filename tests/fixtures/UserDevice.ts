import { BrowserType, chromium, webkit, devices } from '@playwright/test';

export enum UserDevice {
	Iphone14 = 'Iphone14',
	SamsungGalaxyS24 = 'SamsungGalaxyS24',
	SamsungGalaxyS24Ultra = 'SamsungGalaxyS24Ultra',
}

export const userDeviceToBrowserType: Record<UserDevice, BrowserType> = {
	[UserDevice.Iphone14]: webkit,
	[UserDevice.SamsungGalaxyS24]: chromium,
	[UserDevice.SamsungGalaxyS24Ultra]: chromium,
}

type DeviceDescriptor = (typeof devices)[keyof typeof devices];
export const userDeviceToDeviceDescriptor: Record<UserDevice, DeviceDescriptor> = {
	[UserDevice.Iphone14]: devices['iPhone 14'],
	[UserDevice.SamsungGalaxyS24]: devices['Galaxy S24'],
	[UserDevice.SamsungGalaxyS24Ultra]: {
		...devices['Galaxy S24'],
		viewport: {
			height: 894,
			width: 412,
		},
		deviceScaleFactor: 3.5
	},
}