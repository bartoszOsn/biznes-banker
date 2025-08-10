import type { UserColor } from '../../domain/model/UserColor.ts';
import type { SessionDTO } from './SessionDTO.ts';
import { type Database, ref, set } from 'firebase/database';
import { getRef } from './util/getRef.ts';

export const pushNewUser = (db: Database, userId: string) => async (sessionId: string, name: string, color: UserColor, isBanker = false): Promise<string> => {
	const userDTO: SessionDTO['users'][string] = {
		name: name,
		color: color,
	};
	const userRef = getRef(db, sessionId, 'users', userId);
	await set(userRef, userDTO);

	if (isBanker) {
		await set(ref(db, `sessions/${sessionId}/bankerUserId`), userId);
	}

	return userId;
};