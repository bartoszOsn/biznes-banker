import { db } from './fb.ts';
import { getRef } from './util/getRef.ts';
import type { SessionDTO } from './SessionDTO.ts';
import { serverTimestamp, push } from 'firebase/database';

export async function pushTransaction(
	sessionId: string,
	userId: string,
	toUserId: string,
	amount: number
): Promise<void> {
	const ref = getRef(db, sessionId, 'operations');
	const transactionDTO: SessionDTO['operations'][number] = {
		moneyFromPlayerId: userId,
		moneyToPlayerId: toUserId,
		amount,
		timestamp: serverTimestamp() as unknown as number
	};

	await push(ref, transactionDTO);
}