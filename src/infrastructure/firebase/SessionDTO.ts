import type { UserColor } from '../../domain/model/UserColor.ts';

export interface SessionDTO {
	id: string;
	createdAt: string;
	users: {
		[key: string]: {
			name: string;
			color: UserColor
		}
	},
	operations: Array<{
		moneyFromPlayerId: 'banker' | string;
		moneyToPlayerId: 'banker' | string;
		amount: number;
	}>
}