import { useCallback } from 'react';
import { useRepository } from '../Repository.ts';
import type { Session } from '../model/Session.ts';

export function useStartGame(session: Session) {
	const { pushSessionStarted } = useRepository();

	return useCallback(() => {
		pushSessionStarted(session.id, true).then();
	}, [pushSessionStarted, session.id]);
}