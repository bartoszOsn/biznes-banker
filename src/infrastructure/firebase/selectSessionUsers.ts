import { combineLatest, map, type Observable } from 'rxjs';
import type { User } from '../../domain/model/User.ts';
import { selectDbValue } from './util/selectDbValue.ts';
import { getRef } from './util/getRef.ts';
import { db } from './fb.ts';

export function selectSessionUsers(sessionId: string): Observable<User[]> {
  return combineLatest([
	  selectDbValue(getRef(db, sessionId, 'users')),
	  selectDbValue(getRef(db, sessionId, 'bankerUserId'))
  ])
	  .pipe(
		  map(([users, bankerUserId]) => {
			  return Object.entries(users).map(([userId, user]) => {
				  return {
					  id: userId,
					  name: user.name,
					  color: user.color,
					  isAlsoBanker: userId === bankerUserId,
				  }
			  })
		  })
	  );
}