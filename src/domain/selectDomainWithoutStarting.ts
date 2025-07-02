import type { DomainWithoutStarting } from './Domain.ts';
import { filter, map, type Observable } from 'rxjs';
import { selectSessionUsers } from '../infrastructure/firebase/selectSessionUsers.ts';
import { pushSessionStarted } from '../infrastructure/firebase/pushSessionStarted.ts';

export function selectDomainWithoutStarting(sessionId: string, userId: string): Observable<DomainWithoutStarting> {
	return selectSessionUsers(sessionId)
		.pipe(
			map(users => {
				const me = users.find(user => user.id === userId);
				const opponents = users.filter(user => user.id !== userId);

				return [me, opponents] as const;
			}),
			filter(([me]) => me !== undefined),
			map(([me, opponents]) => ({
				stage: 'withoutStarting',
				me: me!,
				opponents,
				joinLink: location.href,
				startGame: () => {
					pushSessionStarted(sessionId, true).then();
				}
			}))
		);
}