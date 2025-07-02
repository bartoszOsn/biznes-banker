import { type Observable, of } from 'rxjs';
import type { DomainWithoutSession } from './Domain.ts';
import { pushNewSession } from '../infrastructure/firebase/pushNewSession.ts';
import { setQueryParam } from '../util/setQueryParam.ts';
import { SESSION_ID_QUERY_PARAM } from './SESSION_ID_QUERY_PARAM.ts';

export function selectDomainWithoutSession(setSessionId: (id: string) => void): Observable<DomainWithoutSession> {
	const domain: DomainWithoutSession = {
		stage: 'withoutSession',
		startSession: () => {
			pushNewSession().then((newSessionId) => {
				setQueryParam(SESSION_ID_QUERY_PARAM, newSessionId);
				setSessionId(newSessionId);
			});
		}
	}

	return of(domain);
}