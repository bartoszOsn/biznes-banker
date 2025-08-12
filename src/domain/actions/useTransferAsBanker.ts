import { useCallback } from 'react';
import { useRepository } from '../Repository.ts';
import type { Session } from '../model/Session.ts';

export function useTransferAsBanker(session: Session) {
	const { pushTransaction } = useRepository();
	
	return useCallback((toUserId: string, amount: number, description: string = '') => {
		pushTransaction(session.id, 'banker', toUserId, amount, description).then();
	}, [pushTransaction, session.id]);
}