import type { User } from '../../domain/model/User.ts';
import { useSelectDbValue } from './util/useSelectDbValue.ts';
import { db } from './fb.ts';
import { getRef } from './util/getRef.ts';

export function useSelectSessionUsers(sessionId: string): User[] {
	if (!sessionId) {
		throw new Error('Session ID is required to select session started state.');
	}

	const bankerId = useSelectDbValue(getRef(db, sessionId, 'bankerUserId'));
	const userMap = useSelectDbValue(getRef(db, sessionId, 'users')) ?? {};

	return Object.entries(userMap)
		.map(([userId, userProps]) => ({
			id: userId,
			name: userProps.name,
			color: userProps.color,
			isAlsoBanker: bankerId === userId,
		}));
}