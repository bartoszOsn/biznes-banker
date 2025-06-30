import { set } from 'firebase/database';
import { db } from './fb.ts';
import { getRef } from './util/getRef.ts';

export async function pushSessionStarted(sessionId: string, started: boolean): Promise<void> {
	const sessionStartedRef = getRef(db,sessionId, 'started');
	await set(sessionStartedRef, started);
}