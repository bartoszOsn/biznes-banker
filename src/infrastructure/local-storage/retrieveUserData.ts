import type { User } from '../../domain/model/User.ts';
import { getLSKey } from './getLSKey.ts';

export function retrieveUserData(sessionId: string): User | null {
	const userData = localStorage.getItem(getLSKey(sessionId));
	if (userData) {
		try {
			return JSON.parse(userData) as User;
		} catch (error) {
			console.error('Error parsing user data:', error);
		}
	}
	return null;
}