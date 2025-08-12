import type { User } from '../model/User.ts';
import { useRepository } from '../Repository.ts';
import { useCallback } from 'react';
import type { Session } from '../model/Session.ts';

export function useKickUser(session: Session) {
	const { removeUserFromSession } = useRepository();

	return useCallback((user: User) => {
		removeUserFromSession(session.id, user.id).then();
	}, [removeUserFromSession, session.id]);
}