import type { Transaction } from '../../domain/model/Transaction.ts';
import { useSelectDbValue } from './util/useSelectDbValue.ts';
import { getRef } from './util/getRef.ts';
import { db } from './fb.ts';

export function useSelectTransactions(sessionId: string): Transaction[] {
	const transactions = useSelectDbValue(getRef(db, sessionId, 'operations')) ?? [];

	return Object.values(transactions).map(t => ({
		fromUserId: t.moneyFromPlayerId,
		toUserId: t.moneyToPlayerId,
		amount: t.amount,
		timestamp: t.timestamp
	})).sort((a, b) => a.timestamp - b.timestamp);
}