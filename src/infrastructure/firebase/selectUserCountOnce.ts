import { type Database, get } from 'firebase/database';
import { getRef } from './util/getRef.ts';

export const selectUserCountOnce = (db: Database) => async (sessionId: string): Promise<number> => {
	const usersRef = getRef(db, sessionId, 'users');
	const snapshot = await get(usersRef);
	if (!snapshot.exists()) {
		return 0;
	}
	return snapshot.size;
};