import { type ReactNode, useEffect, useState } from 'react';
import { SESSION_ID_QUERY_PARAM } from './SESSION_ID_QUERY_PARAM.ts';
import { DomainWithoutSessionProvider } from './DomainWithoutSessionProvider.tsx';
import { DomainWithSessionProvider } from './DomainWithSessionProvider.ts';

export function DomainProvider({children}: { children: ReactNode }) {
	const [sessionId, setSessionId] = useState<string | null>(null);

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);

		if (searchParams.has(SESSION_ID_QUERY_PARAM)) {
			setSessionId(searchParams.get(SESSION_ID_QUERY_PARAM))
		}
	}, []);

	if (!sessionId) {
		return (
			<DomainWithoutSessionProvider setSessionId={setSessionId}>
				{children}
			</DomainWithoutSessionProvider>
		)
	}

	return (
		<DomainWithSessionProvider sessionId={sessionId}>
			{children}
		</DomainWithSessionProvider>
	);
}



