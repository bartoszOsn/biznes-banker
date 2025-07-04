import type { UserColor } from './UserColor.ts';

export type User = UserWithBanker | UserWithoutBanker;

export interface BaseUser {
	id: string;
	name: string;
	color: UserColor;
}

export interface UserWithBanker extends BaseUser {
	isAlsoBanker: true;
}

export interface UserWithoutBanker extends BaseUser {
	isAlsoBanker: false;
}