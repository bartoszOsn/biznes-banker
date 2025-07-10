import type { DomainWithoutStarting } from './Domain.ts';
import { filter, map, type Observable, switchMap, combineLatest } from 'rxjs';
import { selectSessionUsers } from '../infrastructure/firebase/selectSessionUsers.ts';
import { pushSessionStarted } from '../infrastructure/firebase/pushSessionStarted.ts';
import { selectStartingMoney } from '../infrastructure/firebase/selectStartingMoney.ts';
import { selectPresets } from '../infrastructure/firebase/selectPresets.ts';
import { pushStartingMoney } from '../infrastructure/firebase/pushStartingMoney.ts';
import { pushPresets } from '../infrastructure/firebase/pushPresets.ts';
import { selectStartingMoneyOnce } from '../infrastructure/firebase/selectStartingMoneyOnce.ts';
import { pushTransaction } from '../infrastructure/firebase/pushTransaction.ts';

export function selectDomainWithoutStarting(sessionId: string, userId: string): Observable<DomainWithoutStarting> {
	return selectSessionUsers(sessionId)
		.pipe(
			map(users => {
				const me = users.find(user => user.id === userId);
				const opponents = users.filter(user => user.id !== userId);

				return [me, opponents] as const;
			}),
			filter(([me]) => me !== undefined),
			switchMap(([me, opponents]) => {
				return combineLatest([
					selectStartingMoney(sessionId),
					selectPresets(sessionId)
				])
					.pipe(
						map(([startingMoney, presets]) => [me!, opponents, startingMoney, presets] as const)
					)
			}),
			map(([me, opponents, startingMoney, presets]) => {

				const asBanker: DomainWithoutStarting['asBanker'] = me.isAlsoBanker ? {
					startGame: () => {
						pushSessionStarted(sessionId, true)
							.then(() => selectStartingMoneyOnce(sessionId))
							.then((startingMoney) => {
								if (startingMoney !== null) {
									for (const user of [me, ...opponents]) {
										pushTransaction(sessionId, 'banker', user.id, startingMoney).then()
									}
								}
							})
					},
					startingMoney: startingMoney,
					presets: presets,
					setStartingMoney: (amount) => {
						pushStartingMoney(sessionId, amount).then();
					},
					setPresets: (presets) => {
						pushPresets(sessionId, presets).then();
					}
				} : null;

				return {
					stage: 'withoutStarting',
					me: me,
					opponents,
					joinLink: location.href,
					asBanker
				};
			})
		);
}