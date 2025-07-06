import { getRef } from './util/getRef.ts';
import { db } from './fb.ts';
import { set } from 'firebase/database';

export async function pushBankerId(sessionId: string, bankerId: string): Promise<void> {
	const sessionBankerRef = getRef(db,sessionId, 'bankerUserId');
	await set(sessionBankerRef, bankerId);
}