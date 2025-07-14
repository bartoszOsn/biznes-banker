import type { Session } from '../../domain/model/Session.ts';
import { useEffect, useState } from 'react';
import { db } from './fb.ts';
import { onValue, ref } from 'firebase/database';
import type { SessionDTO } from './SessionDTO.ts';
import { sessionDTOToSession } from './sessionDTOToSession.ts';

export function useSelectSession(sessionId: string | null): Session | null {
	const [session, setSession] = useState<SessionDTO | null>(null);

	useEffect(() => {
		if (!sessionId) {
			setSession(null);
			return;
		}

		const sessionRef = ref(db, `sessions/${sessionId}`);
		const unsubscribe = onValue(sessionRef, snapshot => {
			const data = snapshot.val();
			if (data) {
				setSession(data as SessionDTO);
			} else {
				setSession(null);
			}
		});

		return unsubscribe;
	}, [sessionId]);

	return session === null || sessionId === null ? null : sessionDTOToSession(sessionId, session);
}