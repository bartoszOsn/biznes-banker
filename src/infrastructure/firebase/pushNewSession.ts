import type { SessionDTO } from './SessionDTO.ts';
import { type Database, push, ref, serverTimestamp } from 'firebase/database';

export const pushNewSession = (db: Database) => async (): Promise<string> => {
	const session: SessionDTO = {
		createdAt: serverTimestamp() as unknown as number,
		started: false,
		bankerUserId: null,
		users: {},
		operations: {}
	};

	const sessionsRef = ref(db, 'sessions');
	const sessionRef = await push(sessionsRef, session);
	const key = sessionRef.key;

	if (!key) {
		throw new Error('Failed to create new session: no key returned from push');
	}

	return key;
};