import { set } from 'firebase/database';
import { db } from './fb.ts';
import { getRef } from './util/getRef.ts';

export async function pushStartingMoney(sessionId: string, startingMoney: number | null): Promise<void> {
	const startingMoneyRef = getRef(db,sessionId, 'startingMoney');
	await set(startingMoneyRef, startingMoney ?? undefined);
}