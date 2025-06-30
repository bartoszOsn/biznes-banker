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
	operations: {
		[key: string]: {
			moneyFromPlayerId: 'banker' | string;
			moneyToPlayerId: 'banker' | string;
			amount: number;
			timestamp: number;
		}
	};
}