import type { StateMachineState } from '../util/createStateMachine.tsx';
import type { DomainWithoutSession } from './Domain.ts';
import { useState } from 'react';

const sessionIdQueryParam = 's';

export const withoutSessionStateMachineState = {
	handler: () => {
		const [sessionId, setSessionId] = useState<string | null>(() => {
			const urlParams = new URLSearchParams(window.location.search);
			const sessionIdFromUrl = urlParams.get(sessionIdQueryParam);
			return sessionIdFromUrl ? sessionIdFromUrl : null;
		});

		const domain: DomainWithoutSession = {
			stage: 'withoutSession',
			startSession: () => {
				if (sessionId) {
					return;
				}

				const newSessionId = crypto.randomUUID();
				setSessionId(newSessionId);

				const url = new URL(window.location.href);
				url.searchParams.set(sessionIdQueryParam, newSessionId);
				window.history.replaceState({}, '', url.toString());
			}
		}

		return { state: domain, context: [sessionId] };
	}
} satisfies StateMachineState<unknown, unknown[]>