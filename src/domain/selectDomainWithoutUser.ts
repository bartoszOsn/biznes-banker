import { type Observable, of } from 'rxjs';
import type { DomainWithoutUser } from './Domain.ts';
import type { UserColor } from './model/UserColor.ts';
import { selectUserCountOnce } from '../infrastructure/firebase/selectUserCountOnce.ts';
import { pushNewUser } from '../infrastructure/firebase/pushNewUser.ts';
import { getUserIdLSKey } from './getUserIdLSKey.ts';

export function selectDomainWithoutUser(sessionId: string, setUserId: (newUserId: string) => void): Observable<DomainWithoutUser> {
	const domain: DomainWithoutUser = {
		stage: 'withoutUser',
		setUserProps: (name: string, color: UserColor) => {
			selectUserCountOnce(sessionId)
				.then((userCount) => {
					const isBanker = userCount === 0;
					return pushNewUser(sessionId, name, color, isBanker);
				})
				.then((userId) => {
					const lsKey = getUserIdLSKey(sessionId);
					localStorage.setItem(lsKey, userId);
					setUserId(userId);
				});
		}
	}

	return of(domain);
}