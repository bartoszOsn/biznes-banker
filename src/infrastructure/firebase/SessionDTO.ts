import type { UserColor } from '../../domain/model/UserColor.ts';

export interface SessionDTO {
	createdAt: number;
	started: boolean;
	bankerUserId: string | null;
	users: {
		[key: string]: {
			name: string;
			color: UserColor;
		};
	},
	operations: Array<{
		moneyFromPlayerId: 'banker' | string;
		moneyToPlayerId: 'banker' | string;
		amount: number;
	}>
}