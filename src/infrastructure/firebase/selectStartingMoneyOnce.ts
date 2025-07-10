import { getRef } from './util/getRef.ts';
import { db } from './fb.ts';
import { get } from 'firebase/database';

export async function selectStartingMoneyOnce(sessionId: string): Promise<number | null> {
	const startingMoneyRef = getRef(db, sessionId, 'startingMoney');
	const snapshot = await get(startingMoneyRef);
	if (!snapshot.exists()) {
		return null;
	}
	return snapshot.val() ?? null;
}