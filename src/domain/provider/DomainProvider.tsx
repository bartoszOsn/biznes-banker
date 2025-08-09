import { type ReactNode, useCallback, useEffect, useState } from 'react';
import { SESSION_ID_QUERY_PARAM } from '../util/SESSION_ID_QUERY_PARAM.ts';
import { useSelectSession } from '../../infrastructure/firebase/useSelectSession.ts';
import { getUserIdLSKey } from '../util/getUserIdLSKey.ts';
import { DomainWithoutSessionProvider } from './DomainWithoutSessionProvider.tsx';
import { DomainWithoutUserProvider } from './DomainWithoutUserProvider.tsx';
import { DomainWithoutStartingProvider } from './DomainWithoutStartingProvider.tsx';
import { MainDomainProvider } from './MainDomainProvider.tsx';

export function DomainProvider({ children }: { children: ReactNode }): ReactNode {
	const [sessionId, setSessionIdState] = useState<string | null>(() => {
		const queryParams = new URLSearchParams(window.location.search);
		return queryParams.get(SESSION_ID_QUERY_PARAM) || null;
	});

	const setSessionId = useCallback((newSessionId: string | null) => {
		const queryParams = new URLSearchParams(window.location.search);
		if (newSessionId) {
			queryParams.set(SESSION_ID_QUERY_PARAM, newSessionId);
		} else {
			queryParams.delete(SESSION_ID_QUERY_PARAM);
		}
		window.history.replaceState({}, '', `?${queryParams.toString()}`);
		setSessionIdState(newSessionId);
	}, []);

	const session = useSelectSession(sessionId);

	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		if (!sessionId) {
			setUserId(null);
			return;
		}

		const lsKey = getUserIdLSKey(sessionId);
		const storedUserId = localStorage.getItem(lsKey);
		if (storedUserId) {
			setUserId(storedUserId);
		} else {
			setUserId(null);
		}
	}, [sessionId]);

	if (!sessionId || !session) {
		return (
			<DomainWithoutSessionProvider setSessionId={setSessionId}>
				{children}
			</DomainWithoutSessionProvider>
		);
	}

	if (!userId) {
		return (
			<DomainWithoutUserProvider session={session} setUserId={setUserId}>
				{children}
			</DomainWithoutUserProvider>
		);
	}

	if (!session.started) {
		return (
			<DomainWithoutStartingProvider session={session} userId={userId}>
				{children}
			</DomainWithoutStartingProvider>
		);
	}

	return (
		<MainDomainProvider session={session} userId={userId}>
			{children}
		</MainDomainProvider>
	);
}