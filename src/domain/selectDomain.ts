import { getQueryParamValue } from '../util/selectQueryParam.ts';
import { BehaviorSubject, type Observable, startWith, Subject, switchMap } from 'rxjs';
import type { Domain } from './Domain.ts';
import { SESSION_ID_QUERY_PARAM } from './SESSION_ID_QUERY_PARAM.ts';
import { selectDomainWithoutSession } from './selectDomainWithoutSession.ts';
import { getUserIdLSKey } from './getUserIdLSKey.ts';
import { selectDomainWithoutUser } from './selectDomainWithoutUser.ts';
import { selectSessionStarted } from '../infrastructure/firebase/selectSessionStarted.ts';
import { selectDomainWithoutStarting } from './selectDomainWithoutStarting.ts';
import { createSelectMainDomain } from './selectMainDomain.ts';

export function selectDomain(): Observable<Domain> {
	const sessionId$ = new BehaviorSubject<string | null>(getQueryParamValue(SESSION_ID_QUERY_PARAM));
	const userId$ = new Subject<string>();
	const selectMainDomain = createSelectMainDomain();

	return sessionId$
		.pipe(
			switchMap((sessionId) => {
				if (!sessionId) {
					return selectDomainWithoutSession((newSessionId) => sessionId$.next(newSessionId));
				}

				const lsKey = getUserIdLSKey(sessionId);
				const storedUserId = localStorage.getItem(lsKey);

				return userId$.pipe(
					startWith(storedUserId),
					switchMap(userId => {
						if (userId === null) {
							return selectDomainWithoutUser(
								sessionId,
								(newUserId) => userId$.next(newUserId)
							);
						}

						return selectSessionStarted(sessionId)
							.pipe(
								switchMap(started => {
									if (!started) {
										return selectDomainWithoutStarting(sessionId, userId);
									}

									return selectMainDomain(sessionId, userId);
								})
							);
					})
				);
			})
		)
}
