import type { MainDomain } from './Domain.ts';
import { filter, map, type Observable } from 'rxjs';
import { selectSessionUsers } from '../infrastructure/firebase/selectSessionUsers.ts';
import { combineLatest } from 'rxjs';
import { selectTransactions } from '../infrastructure/firebase/selectTransactions.ts';
import { pushTransaction } from '../infrastructure/firebase/pushTransaction.ts';

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
					opponents,
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