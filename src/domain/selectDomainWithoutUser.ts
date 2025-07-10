import { type Observable, of } from 'rxjs';
import type { DomainWithoutUser } from './Domain.ts';
import type { UserColor } from './model/UserColor.ts';
import { selectUserCountOnce } from '../infrastructure/firebase/selectUserCountOnce.ts';
import { pushNewUser } from '../infrastructure/firebase/pushNewUser.ts';
import { getUserIdLSKey } from './getUserIdLSKey.ts';
import { selectStartingMoneyOnce } from '../infrastructure/firebase/selectStartingMoneyOnce.ts';
import { pushTransaction } from '../infrastructure/firebase/pushTransaction.ts';

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
					return userId;
				})
				.then(async (userID) => {
					const s = await selectStartingMoneyOnce(sessionId);
					return [userID, s] as const;
				})
				.then(([userId, startingMoney]) => {
					if (startingMoney && startingMoney > 0) {
						return pushTransaction(sessionId, 'banker', userId, startingMoney);
					}
				});
		}
	}

	return of(domain);
}