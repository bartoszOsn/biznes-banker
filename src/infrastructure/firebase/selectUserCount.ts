import { get } from 'firebase/database';
import { db } from './fb.ts';
import { getRef } from './util/getRef.ts';

export async function selectUserCount(sessionId: string): Promise<number> {
	const usersRef = getRef(db, sessionId, 'users');
	const snapshot = await get(usersRef);
	if (!snapshot.exists()) {
		return 0;
	}
	return snapshot.size;
}