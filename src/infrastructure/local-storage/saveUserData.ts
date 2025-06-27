import type { User } from '../../domain/model/User.ts';
import { getLSKey } from './getLSKey.ts';

export function saveUserData(sessionId: string, user: User): void {
	const userData = JSON.stringify(user);
	localStorage.setItem(getLSKey(sessionId), userData);
}
