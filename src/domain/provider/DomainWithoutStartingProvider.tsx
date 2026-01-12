import { type ReactNode, useMemo } from 'react';
import type { DomainWithoutStarting } from '../Domain.ts';
import type { Session } from '../model/Session.ts';
import { DomainContext } from '../DomainContext.ts';
import { useStartGame } from '../actions/useStartGame.ts';
import { useJoinLink } from '../data-derivers/useJoinLink.ts';
import { useSplitUsersToMeAndOpponents } from '../data-derivers/useSplitUsersToMeAndOpponents.ts';
import { useKickUser } from '../actions/useKickUser.ts';
import { useChangeUsernameAndColor } from '../actions/useChangeUsernameAndColor.ts';

export interface DomainWithoutStartingProviderProps {
	children: ReactNode;
	session: Session;
	userId: string;
}

export function DomainWithoutStartingProvider(props: DomainWithoutStartingProviderProps): ReactNode {
	const { children, session, userId } = props;

	const joinLink = useJoinLink();
	const [me, opponents] = useSplitUsersToMeAndOpponents(session.users, userId);

	const startGame = useStartGame(session);
	const kickUser = useKickUser(session);
	const changeUsernameAndColor = useChangeUsernameAndColor(session, me);

	const asBanker: DomainWithoutStarting['asBanker'] = useMemo(() => me.isAlsoBanker
		? {
			startGame,
			kickUser
		} : null, [kickUser, me.isAlsoBanker, startGame]);

	const domain: DomainWithoutStarting = {
		stage: 'withoutStarting',
		joinLink,
		me,
		opponents,
		asBanker,
		changeUsernameAndColor
	};

	return (
		<DomainContext.Provider value={domain}>
			{children}
		</DomainContext.Provider>
	);
}