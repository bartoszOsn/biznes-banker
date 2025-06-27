import type { UserColor } from './UserColor.ts';

export interface User {
	id: string;
	name: string;
	color: UserColor;
	isAlsoBanker: boolean;
}