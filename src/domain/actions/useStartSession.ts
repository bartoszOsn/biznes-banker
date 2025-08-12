import { useCallback } from 'react';
import { useRepository } from '../Repository.ts';

export function useStartSession(setSessionId: (sessionId: string | null) => void) {
	const { pushNewSession } = useRepository();
	
	return useCallback(() => {
		pushNewSession().then((newSessionId) => {
			setSessionId(newSessionId);
		});
	}, [pushNewSession, setSessionId]);
}