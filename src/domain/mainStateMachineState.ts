import type { StateMachineState } from '../util/createStateMachine.tsx';
import type { MainDomain } from './Domain.ts';
import { useQueryParam } from '../util/useQueryParam.ts';
import { SESSION_ID_QUERY_PARAM } from './SESSION_ID_QUERY_PARAM.ts';
import { useMemo } from 'react';
import { getUserIdLSKey } from './getUserIdLSKey.ts';
import { useSelectSessionStarted } from '../infrastructure/firebase/useSelectSessionStarted.ts';
import { useSelectSessionUsers } from '../infrastructure/firebase/useSelectSessionUsers.ts';
import { useSelectTransactions } from '../infrastructure/firebase/useSelectTransactions.ts';
import { pushTransaction } from '../infrastructure/firebase/pushTransaction.ts';

export const mainStateMachineState = {
	useHandler: () => {
		const [sessionId] = useQueryParam(SESSION_ID_QUERY_PARAM);
		const userId = useMemo(() => localStorage.getItem(getUserIdLSKey(sessionId)), [sessionId]);
		if (!sessionId) {
			throw new Error('Session ID is required to use the withoutStarting state.');
		}
		if (!userId) {
			throw new Error('User ID is required to use the withoutStarting state.');
		}

		const sessionStarted = useSelectSessionStarted(sessionId);
		const users = useSelectSessionUsers(sessionId);

		const me = useMemo(() => users.find(user => user.id === userId) ?? null, [users, userId]);
		const opponents = useMemo(() => users.filter(user => user.id !== userId), [users, userId]);

		const transactions = useSelectTransactions(sessionId);
		const balance = useMemo(() => {
			return transactions.reduce((acc, tr) => {
				if (tr.fromUserId === userId) {
					return acc - tr.amount;
				}
				if (tr.toUserId === userId) {
					return acc + tr.amount;
				}
				return acc;
			}, 0)
		}, [transactions, userId]);

		const domain: MainDomain = {
			stage: 'main',
			me,
			opponents,
			transactions,
			balance,
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
		};

		return {
			state: domain,
			context: [sessionId, userId, sessionStarted] as const
		};
	}
} satisfies StateMachineState<unknown, unknown[]>;