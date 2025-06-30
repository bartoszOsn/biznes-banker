import type { UserColor } from '../../domain/model/UserColor.ts';
import type { SessionDTO } from './SessionDTO.ts';
import { db } from './fb.ts';
import { push, ref } from 'firebase/database';

export async function pushNewUser(sessionId: string, name: string, color: UserColor): Promise<string> {
	const userDTO: SessionDTO['users'][string] = {
		name: name,
		color: color,
	};
	const usersRef = ref(db, `sessions/${sessionId}/users`);
	const userRef = await push(usersRef, userDTO);
	if (!userRef.key) {
		throw new Error('Failed to create new user: no key returned from push');
	}

	return userRef.key;
}