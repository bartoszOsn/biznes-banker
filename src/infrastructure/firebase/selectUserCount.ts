import { ref, get } from 'firebase/database';
import { db } from './fb.ts';

export async function selectUserCount(sessionId: string): Promise<number> {
	const usersRef = ref(db, `sessions/${sessionId}/users`);
	const snapshot = await get(usersRef);
	if (!snapshot.exists()) {
		return 0;
	}
	return snapshot.size;
}