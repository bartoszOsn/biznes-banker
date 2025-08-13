import type { UserColor } from '../../domain/model/UserColor.ts';
import { type Database, ref, update } from 'firebase/database';
import type { SessionDTO } from './SessionDTO.ts';

export const changeUserInfo = (db: Database) =>
	async (sessionId: string, userId: string, name: string, color: UserColor): Promise<void> => {
		const userRef = ref(db, `sessions/${sessionId}/users/${userId}`);

		const dto: SessionDTO['users'][string] = {
			name,
			color
		}

		await update(userRef, dto);
	};