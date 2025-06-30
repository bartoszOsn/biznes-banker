import type { UserColor } from '../../domain/model/UserColor.ts';
import type { SessionDTO } from './SessionDTO.ts';
import { db } from './fb.ts';
import { push, ref, set } from 'firebase/database';
import { getRef } from './util/getRef.ts';

export async function pushNewUser(sessionId: string, name: string, color: UserColor, isBanker = false): Promise<string> {
	const userDTO: SessionDTO['users'][string] = {
		name: name,
		color: color,
	};
	const usersRef = getRef(db, sessionId, 'users');
	const userRef = await push(usersRef, userDTO);
	if (!userRef.key) {
		throw new Error('Failed to create new user: no key returned from push');
	}

	if (isBanker) {
		await set(ref(db, `sessions/${sessionId}/bankerUserId`), userRef.key);
	}

	return userRef.key;
}