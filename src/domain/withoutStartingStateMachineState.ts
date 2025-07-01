import type { StateMachineState } from '../util/createStateMachine.tsx';
import type { DomainWithoutStarting } from './Domain.ts';
import { useQueryParam } from '../util/useQueryParam.ts';
import { SESSION_ID_QUERY_PARAM } from './SESSION_ID_QUERY_PARAM.ts';
import { useMemo } from 'react';
import { getUserIdLSKey } from './getUserIdLSKey.ts';
import { useSelectSessionStarted } from '../infrastructure/firebase/useSelectSessionStarted.ts';
import { pushSessionStarted } from '../infrastructure/firebase/pushSessionStarted.ts';
import { useSelectSessionUsers } from '../infrastructure/firebase/useSelectSessionUsers.ts';

export const withoutStartingStateMachineState = {
	useHandler: () => {
		const [sessionId] = useQueryParam(SESSION_ID_QUERY_PARAM);
		const userId = useMemo(() => localStorage.getItem(getUserIdLSKey(sessionId)), [sessionId]);
		if (!sessionId) {
			throw new Error('Session ID is required to use the withoutStarting state.');
		}
		if (!userId) {
			throw new Error('User ID is required to use the withoutStarting state.');
		}

		const sessionStarted = useSelectSessionStarted(sessionId);
		const users = useSelectSessionUsers(sessionId);

		const me = useMemo(() => users.find(user => user.id === userId) ?? null, [users, userId]);
		const opponents = useMemo(() => users.filter(user => user.id !== userId), [users, userId]);

		const domain: DomainWithoutStarting = {
			stage: 'withoutStarting',
			me,
			opponents,
			joinLink: location.href,
			startGame: () => {
				pushSessionStarted(sessionId, true).then();
			}
		}

		return {
			state: domain,
			context: [sessionId, userId, sessionStarted] as const
		};
	}
} satisfies StateMachineState<unknown, unknown[]>