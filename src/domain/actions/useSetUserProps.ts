import { useCallback } from 'react';
import type { UserColor } from '../model/UserColor.ts';
import { useRepository } from '../Repository.ts';
import type { Session } from '../model/Session.ts';

export function useSetUserProps(session: Session) {
	const { pushNewUser, selectUserCountOnce } = useRepository();

	return useCallback((name: string, color: UserColor) => {
		selectUserCountOnce(session.id)
			.then((userCount) => {
				const isBanker = userCount === 0;
				return pushNewUser(session.id, name, color, isBanker);
			});
	}, [pushNewUser, selectUserCountOnce, session.id]);
}