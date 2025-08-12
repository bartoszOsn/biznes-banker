import { type ReactNode } from 'react';
import type { DomainWithoutSession } from '../Domain.ts';
import { DomainContext } from '../DomainContext.ts';
import { useStartSession } from '../actions/useStartSession.ts';

export interface DomainWithoutSessionProviderProps {
	children: ReactNode;
	setSessionId: (sessionId: string | null) => void;
}

export function DomainWithoutSessionProvider(props: DomainWithoutSessionProviderProps): ReactNode {
	const { children, setSessionId } = props;

	const startSession = useStartSession(setSessionId);

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