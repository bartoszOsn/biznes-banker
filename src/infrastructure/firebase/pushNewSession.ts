import type { SessionDTO } from './SessionDTO.ts';
import { push, ref, serverTimestamp } from 'firebase/database';
import { db } from './fb.ts';

const sessionsRef = ref(db, 'sessions');

export async function pushNewSession(): Promise<string> {
	const session: SessionDTO = {
		createdAt: serverTimestamp() as unknown as number,
		started: false,
		bankerUserId: null,
		users: {},
		operations: []
	};

	const ref = await push(sessionsRef, session);
	const key = ref.key;

	if (!key) {
		throw new Error('Failed to create new session: no key returned from push');
	}

	return key;
}