import { type ReactNode, useCallback } from 'react';
import type { DomainWithoutStarting } from './Domain.ts';
import type { Session } from './model/Session.ts';
import { DomainContext } from './DomainContext.ts';
import { pushSessionStarted } from '../infrastructure/firebase/pushSessionStarted.ts';
import { pushStartingMoney } from '../infrastructure/firebase/pushStartingMoney.ts';
import { pushPresets } from '../infrastructure/firebase/pushPresets.ts';
import type { Preset } from './model/Preset.ts';
import { splitUsersToMeAndOpponents } from './splitUsersToMeAndOpponents.ts';

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
	const startGame = useCallback(() => {
		pushSessionStarted(session.id, true).then();
	}, [session.id]);
	const setStartingMoney = useCallback((amount: number | null) => {
		pushStartingMoney(session.id, amount).then();
	}, [session.id]);
	const setPresets = useCallback((presets: Preset[]) => {
		pushPresets(session.id, presets).then();
	}, [session.id]);


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