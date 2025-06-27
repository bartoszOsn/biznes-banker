import type { UserColor } from '../../domain/model/UserColor.ts';

export interface SessionDTO {
	createdAt: string;
	started: boolean;
	users: {
		[key: string]: {
			name: string;
			color: UserColor;
			isAlsoBanker: boolean;
		}
	},
	operations: Array<{
		moneyFromPlayerId: 'banker' | string;
		moneyToPlayerId: 'banker' | string;
		amount: number;
	}>
}