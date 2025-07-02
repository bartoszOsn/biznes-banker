import { map, Observable } from 'rxjs';
import type { Transaction } from '../../domain/model/Transaction.ts';
import { selectDbValue } from './util/selectDbValue.ts';
import { getRef } from './util/getRef.ts';
import { db } from './fb.ts';

export function selectTransactions(sessionId: string): Observable<Transaction[]> {
	return selectDbValue(getRef(db, sessionId, 'operations'))
		.pipe(
			map(transactions => {
				return Object.values(transactions ?? []).map(t => ({
					fromUserId: t.moneyFromPlayerId,
					toUserId: t.moneyToPlayerId,
					amount: t.amount,
					timestamp: t.timestamp
				})).sort((a, b) => a.timestamp - b.timestamp);
			})
		)
}