import type { User } from '../model/User.ts';
import { useMemo } from 'react';

export function useSplitUsersToMeAndOpponents(users: User[], myUserId: string): [me: User, opponents: User[]] {
	return useMemo(() => {
		const me =  users.find((user) => user.id === myUserId);
		const opponents = users.filter((user) => user.id !== myUserId);

		if (!me) {
			throw new Error('User not found in session');
		}

		return [me, opponents];
	}, [users, myUserId]);
}