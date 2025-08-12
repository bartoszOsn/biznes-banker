import { type Database, ref, remove } from 'firebase/database';

export const removeUserFromSession = (db: Database) => async (
	sessionId: string,
	userId: string
) => {
	const userRef = ref(db, `sessions/${sessionId}/users/${userId}`);
	return remove(userRef);
}