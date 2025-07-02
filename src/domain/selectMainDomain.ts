import type { MainDomain } from './Domain.ts';
import { combineLatest, filter, map, type Observable } from 'rxjs';
import { selectSessionUsers } from '../infrastructure/firebase/selectSessionUsers.ts';
import { selectTransactions } from '../infrastructure/firebase/selectTransactions.ts';
import { pushTransaction } from '../infrastructure/firebase/pushTransaction.ts';
import type { User } from './model/User.ts';
import { UserColor } from './model/UserColor.ts';

export function selectMainDomain(sessionId: string, userId: string): Observable<MainDomain> {
	return combineLatest([
		selectSessionUsers(sessionId),
		selectTransactions(sessionId)
	])
		.pipe(
			map(([users, transactions]) => {
				const me = users.find(user => user.id === userId);
				const opponents = users.filter(user => user.id !== userId);

				return [me, opponents, transactions] as const;
			}),
			filter(([me]) => me !== undefined),
			map(([me, opponents, transactions]) => {
				const balance = transactions.reduce((acc, tr) => {
					if (tr.fromUserId === userId) {
						return acc - tr.amount;
					}
					if (tr.toUserId === userId) {
						return acc + tr.amount;
					}
					return acc;
				}, 0);

				return ({
					stage: 'main',
					me: me!,
					opponents: [...opponents, ...mockUsers], // Mock users for testing
					balance: balance,
					transactions: transactions,
					transfer: (toUserId: string, amount: number) => {
						if (toUserId === userId) {
							throw new Error('Cannot transfer money to yourself.');
						}
						if (amount <= 0) {
							throw new Error('Transfer amount must be greater than zero.');
						}
						if (amount > balance) {
							throw new Error('Insufficient balance for transfer.');
						}

						pushTransaction(sessionId, userId, toUserId, amount).then();
					}
				});
			})
		);
}

const mockUsers: User[] = [
	{
		id: 'mock1',
		name: 'Bartek',
		color: UserColor.GREEN,
		isAlsoBanker: false
	},
	{
		id: 'mock2',
		name: 'Krzysztof',
		color: UserColor.YELLOW,
		isAlsoBanker: false
	},
	{
		id: 'mock3',
		name: 'Janusz',
		color: UserColor.RED,
		isAlsoBanker: false
	},
	{
		id: 'mock4',
		name: 'Marek',
		color: UserColor.BLUE,
		isAlsoBanker: false
	}
]