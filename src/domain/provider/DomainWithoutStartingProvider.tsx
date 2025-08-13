import { type ReactNode } from 'react';
import type { DomainWithoutStarting } from '../Domain.ts';
import type { Session } from '../model/Session.ts';
import { DomainContext } from '../DomainContext.ts';
import { useStartGame } from '../actions/useStartGame.ts';
import { useSetStartingMoney } from '../actions/useSetStartingMoney.ts';
import { useSetPresets } from '../actions/useSetPresets.ts';
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
	const { presets, startingMoney } = session;

	const joinLink = useJoinLink();
	const [me, opponents] = useSplitUsersToMeAndOpponents(session.users, userId);

	const startGame = useStartGame(session);
	const setStartingMoney = useSetStartingMoney(session);
	const setPresets = useSetPresets(session);
	const kickUser = useKickUser(session);
	const changeUsernameAndColor = useChangeUsernameAndColor(session, me);

	const asBanker: DomainWithoutStarting['asBanker'] = me.isAlsoBanker
		? {
			presets,
			startingMoney,
			startGame,
			setStartingMoney,
			setPresets,
			kickUser
		} : null;

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