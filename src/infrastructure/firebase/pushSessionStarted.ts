import { type Database, set } from 'firebase/database';
import { getRef } from './util/getRef.ts';

export const pushSessionStarted = (db: Database) => async (sessionId: string, started: boolean): Promise<void> => {
	const sessionStartedRef = getRef(db,sessionId, 'started');
	await set(sessionStartedRef, started);
};