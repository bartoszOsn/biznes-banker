import { type ReactNode, useCallback } from 'react';
import type { DomainWithoutSession } from './Domain.ts';
import { DomainContext } from './DomainContext.ts';

export function DomainWithoutSessionProvider(
	{ setSessionId, children }: { setSessionId: (sessionId: string) => void, children: ReactNode }
) {
	const domain: DomainWithoutSession = {
		stage: 'withoutSession',
		startSession: useCallback(() => {
			// TODO: push session to db and setSessionId
		}, [])
	};

	return (
		<DomainContext.Provider value={domain}>
			{children}
		</DomainContext.Provider>
	)
}