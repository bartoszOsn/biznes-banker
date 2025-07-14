import { type ReactNode, useCallback } from 'react';
import type { DomainWithoutSession } from './Domain.ts';
import { pushNewSession } from '../infrastructure/firebase/pushNewSession.ts';
import { DomainContext } from './DomainContext.ts';

export interface DomainWithoutSessionProviderProps {
	children: ReactNode;
	setSessionId: (sessionId: string | null) => void;
}

export function DomainWithoutSessionProvider(props: DomainWithoutSessionProviderProps): ReactNode {
	const { children, setSessionId } = props;

	const startSession = useCallback(() => {
		pushNewSession().then((newSessionId) => {
			setSessionId(newSessionId);
		});
	}, [setSessionId]);

	const domain: DomainWithoutSession = {
		stage: 'withoutSession',
		startSession
	}

	return (
		<DomainContext.Provider value={domain}>
			{children}
		</DomainContext.Provider>
	);
}