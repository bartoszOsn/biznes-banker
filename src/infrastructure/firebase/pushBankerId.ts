import { getRef } from './util/getRef.ts';
import { type Database, set } from 'firebase/database';

export const pushBankerId = (db: Database) => async (sessionId: string, bankerId: string): Promise<void> => {
	const sessionBankerRef = getRef(db,sessionId, 'bankerUserId');
	await set(sessionBankerRef, bankerId);
};