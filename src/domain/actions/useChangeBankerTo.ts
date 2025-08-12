import { useCallback } from 'react';
import { useRepository } from '../Repository.ts';
import type { Session } from '../model/Session.ts';
import type { User } from '../model/User.ts';

export function useChangeBankerTo(session: Session, me: User) {
	const { pushBankerId } = useRepository();
	
	return useCallback((userId: string) => {
		if (userId === me.id) {
			throw new Error('Cannot change banker to yourself.');
		}

		pushBankerId(session.id, userId).then();
	}, [me.id, pushBankerId, session.id]);
}