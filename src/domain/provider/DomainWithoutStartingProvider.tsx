import { type ReactNode } from 'react';
import type { DomainWithoutStarting } from '../Domain.ts';
import type { Session } from '../model/Session.ts';
import { DomainContext } from '../DomainContext.ts';
import { splitUsersToMeAndOpponents } from '../util/splitUsersToMeAndOpponents.ts';
import { useStartGame } from '../actions/useStartGame.ts';
import { useSetStartingMoney } from '../actions/useSetStartingMoney.ts';
import { useSetPresets } from '../actions/useSetPresets.ts';

export interface DomainWithoutStartingProviderProps {
	children: ReactNode;
	session: Session;
	userId: string;
}

export function DomainWithoutStartingProvider(props: DomainWithoutStartingProviderProps): ReactNode {
	const { children, session, userId } = props;

	const joinLink = window.location.href;

	const [me, opponents] = splitUsersToMeAndOpponents(session.users, userId);

	const presets = session.presets;
	const startingMoney = session.startingMoney;
	const startGame = useStartGame(session);
	const setStartingMoney = useSetStartingMoney(session);
	const setPresets = useSetPresets(session);


	const asBanker: DomainWithoutStarting['asBanker'] = me.isAlsoBanker
		? {
			presets,
			startingMoney,
			startGame,
			setStartingMoney,
			setPresets
		} : null;

	const domain: DomainWithoutStarting = {
		stage: 'withoutStarting',
		joinLink,
		me,
		opponents,
		asBanker,
	};

	return (
		<DomainContext.Provider value={domain}>
			{children}
		</DomainContext.Provider>
	);
}