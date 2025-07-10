import { selectDbValue } from './util/selectDbValue.ts';
import { getRef } from './util/getRef.ts';
import { db } from './fb.ts';
import { map, type Observable } from 'rxjs';

export function selectStartingMoney(sessionId: string): Observable<number | null> {
	return selectDbValue(getRef(db, sessionId, 'startingMoney')).pipe(map(v => v ?? null));
}