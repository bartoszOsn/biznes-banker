import type { Session } from '../../domain/model/Session.ts';
import { useEffect, useState } from 'react';
import { type Database, onValue, ref } from 'firebase/database';
import type { SessionDTO } from './SessionDTO.ts';
import { sessionDTOToSession } from './sessionDTOToSession.ts';
import { updateWithSharing } from '../../util/updateWithSharing.ts';

export const useSelectSession = (db: Database) => (sessionId: string | null): Session | null => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [session, setSession] = useState<Session | null>(null);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (!sessionId) {
			setSession(null);
			return;
		}

		const sessionRef = ref(db, `sessions/${sessionId}`);
		const unsubscribe = onValue(sessionRef, snapshot => {
			const data = snapshot.val();
			if (data) {
				const session = sessionDTOToSession(sessionId, data as SessionDTO)
				setSession(prev => updateWithSharing(prev, session));
			} else {
				setSession(null);
			}
		});

		return unsubscribe;
	}, [sessionId]);

	return sessionId === null ? null : session;
};