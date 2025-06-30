import type { StateMachineState } from '../util/createStateMachine.tsx';
import type { DomainWithoutSession } from './Domain.ts';
import { useQueryParam } from '../util/useQueryParam.ts';
import { SESSION_ID_QUERY_PARAM } from './SESSION_ID_QUERY_PARAM.ts';
import { pushNewSession } from '../infrastructure/firebase/pushNewSession.ts';

export const withoutSessionStateMachineState = {
	useHandler: () => {
		const [sessionId, setSessionId] = useQueryParam(SESSION_ID_QUERY_PARAM);

		const domain: DomainWithoutSession = {
			stage: 'withoutSession',
			startSession: () => {
				if (sessionId) {
					return;
				}

				pushNewSession().then((newSessionId) => {
					setSessionId(newSessionId);
				});
			}
		}

		return { state: domain, context: [sessionId] as const };
	}
} satisfies StateMachineState<unknown, unknown[]>