import type { DbRef } from './DbRef.ts';
import { onValue } from 'firebase/database';
import { Observable } from 'rxjs';

export function selectDbValue<T>(ref: DbRef<T>): Observable<T> {
	return new Observable<T>(observer => {
		const unsubscribe = onValue(ref, (snapshot) => {
			const data = snapshot.val();
			observer.next(data as T);
		}, (error) => {
			observer.error(error);
		});

		return () => unsubscribe();
	});
}