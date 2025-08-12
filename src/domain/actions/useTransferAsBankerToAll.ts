import { useCallback } from 'react';
import { useTransferAsBanker } from './useTransferAsBanker.ts';
import type { Session } from '../model/Session.ts';

export function useTransferAsBankerToAll(session: Session) {
	const transferAsBanker = useTransferAsBanker(session);

	return useCallback((amount: number, description: string = '') => {
		for (const user of session.users) {
			transferAsBanker(user.id, amount, description);
		}
	}, [session.users, transferAsBanker]);
}