import type { Session } from '../model/Session.ts';
import type { User } from '../model/User.ts';
import { useCallback } from 'react';
import type { UserColor } from '../model/UserColor.ts';
import { useRepository } from '../Repository.ts';

export function useChangeUsernameAndColor(session: Session, me: User) {
	const { changeUserInfo } = useRepository();

	return useCallback((name: string, color: UserColor) => {
		changeUserInfo(session.id, me.id, name, color).then();
	}, [changeUserInfo, me.id, session.id]);
}