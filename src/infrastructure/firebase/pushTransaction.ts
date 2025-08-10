import { getRef } from './util/getRef.ts';
import type { SessionDTO } from './SessionDTO.ts';
import { type Database, push, serverTimestamp } from 'firebase/database';

export const pushTransaction = (db: Database) => async (
	sessionId: string,
	userId: 'banker' | string,
	toUserId: 'banker' | string,
	amount: number,
	description: string = ''
): Promise<void> => {
	const ref = getRef(db, sessionId, 'operations');
	const transactionDTO: SessionDTO['operations'][number] = {
		moneyFromPlayerId: userId,
		moneyToPlayerId: toUserId,
		amount,
		timestamp: serverTimestamp() as unknown as number,
		description
	};

	await push(ref, transactionDTO);
};