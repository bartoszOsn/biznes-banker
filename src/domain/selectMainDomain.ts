import type { MainDomain, MainDomainWithBanker, MainDomainWithoutBanker } from './Domain.ts';
import { BehaviorSubject, combineLatest, filter, map, type Observable, of, switchMap } from 'rxjs';
import { selectSessionUsers } from '../infrastructure/firebase/selectSessionUsers.ts';
import { selectTransactions } from '../infrastructure/firebase/selectTransactions.ts';
import { pushTransaction } from '../infrastructure/firebase/pushTransaction.ts';
import type { User } from './model/User.ts';
import { UserColor } from './model/UserColor.ts';
import { CircumstanceRole } from './model/CircumstanceRole.ts';

export function createSelectMainDomain() {
	const currentRole$ = new BehaviorSubject(CircumstanceRole.USER);

	return (sessionId: string, userId: string): Observable<MainDomain> => combineLatest([
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
			switchMap(([me, opponents, transactions]) => {
				const balance = transactions.reduce((acc, tr) => {
					if (tr.fromUserId === userId) {
						return acc - tr.amount;
					}
					if (tr.toUserId === userId) {
						return acc + tr.amount;
					}
					return acc;
				}, 0);

				const transfer = (toUserId: string, amount: number) => {
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

				if (me!.isAlsoBanker) {
					const transferAsBanker = (toUserId: string, amount: number) => {
						pushTransaction(sessionId, 'banker', toUserId, amount).then();
					}

					return currentRole$
						.pipe(map(role => ({
							stage: 'main',
							me: me!,
							isBanker: true,
							opponents: [...opponents, ...mockUsers], // Mock users for testing
							balance: balance,
							transactions: transactions,
							transfer: transfer,
							transferAsBanker: transferAsBanker,
							role: role,
							setRole: (role: CircumstanceRole) => {
								currentRole$.next(role);
							}
						} satisfies MainDomainWithBanker)))
				}

				return of({
					stage: 'main',
					me: me!,
					isBanker: false,
					opponents: [...opponents, ...mockUsers], // Mock users for testing
					balance: balance,
					transactions: transactions,
					transfer: transfer
				} satisfies MainDomainWithoutBanker);
			})
		)
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