import { type Database, set } from 'firebase/database';
import { getRef } from './util/getRef.ts';

export const pushStartingMoney = (db: Database) => async (sessionId: string, startingMoney: number | null): Promise<void> => {
	const startingMoneyRef = getRef(db,sessionId, 'startingMoney');
	await set(startingMoneyRef, startingMoney ?? undefined);
};