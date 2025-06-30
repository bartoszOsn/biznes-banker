import type { StateMachineState } from '../util/createStateMachine.tsx';
import type { DomainWithoutUser } from './Domain.ts';
import { useQueryParam } from '../util/useQueryParam.ts';
import { SESSION_ID_QUERY_PARAM } from './SESSION_ID_QUERY_PARAM.ts';
import { useEffect, useState } from 'react';
import { getUserIdLSKey } from './getUserIdLSKey.ts';
import { pushNewUser } from '../infrastructure/firebase/pushNewUser.ts';
import type { UserColor } from './model/UserColor.ts';
import { selectUserCount } from '../infrastructure/firebase/selectUserCount.ts';

export const withoutUserStateMachineState = {
	useHandler: () => {
		const [sessionId] = useQueryParam(SESSION_ID_QUERY_PARAM);
		const [userId, setUserId] = useState<string | null>(null);

		useEffect(() => {
			const lsKey = getUserIdLSKey(sessionId);
			const storedUserId = localStorage.getItem(lsKey);
			if (storedUserId !== null) {
				setUserId(storedUserId);
			}
		}, [sessionId]);

		const domain: DomainWithoutUser = {
			stage: 'withoutUser',
			setUserProps: (name: string, color: UserColor) => {
				if (!sessionId) {
					throw new Error('Session ID is required to set user properties.');
				}
				if (userId) {
					throw new Error('User properties already set.');
				}
				selectUserCount(sessionId)
					.then((userCount) => {
						const isBanker = userCount === 0;
						return pushNewUser(sessionId, name, color, isBanker);
					})
					.then((userId) => {
						const lsKey = getUserIdLSKey(sessionId);
						localStorage.setItem(lsKey, userId);
						setUserId(userId);
					});
			}
		}

		return {state: domain, context: [sessionId, userId]};
	}
} satisfies StateMachineState<unknown, unknown[]>