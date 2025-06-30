import { db } from './fb.ts';
import { getRef } from './util/getRef.ts';
import { useSelectDbValue } from './util/useSelectDbValue.ts';

export function useSelectSessionStarted(sessionId: string): boolean {
	if (!sessionId) {
		throw new Error('Session ID is required to select session started state.');
	}

	const sessionStartedRef = getRef(db, sessionId, 'started');
	return useSelectDbValue(sessionStartedRef) ?? false;
}