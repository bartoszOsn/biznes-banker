import { useCallback } from 'react';
import type { Session } from '../model/Session.ts';
import { useRepository } from '../Repository.ts';

export function useSetStartingMoney(session: Session) {
	const { pushStartingMoney } = useRepository();

	return useCallback((amount: number | null) => {
		pushStartingMoney(session.id, amount).then();
	}, [pushStartingMoney, session.id]);
}