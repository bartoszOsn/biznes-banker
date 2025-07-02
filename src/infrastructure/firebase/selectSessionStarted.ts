import type { Observable } from "rxjs";
import { selectDbValue } from './util/selectDbValue.ts';
import { getRef } from './util/getRef.ts';
import { db } from './fb.ts';

export function selectSessionStarted(sessionId: string): Observable<boolean> {
	return selectDbValue(getRef(db, sessionId, 'started'));
}