import type { Session } from '../model/Session.ts';
import type { MainDomain } from '../Domain.ts';
import { splitUsersToMeAndOpponents } from '../util/splitUsersToMeAndOpponents.ts';
import { type ReactNode, useMemo, useState } from 'react';
import { DomainContext } from '../DomainContext.ts';
import { CircumstanceRole } from '../model/CircumstanceRole.ts';
import { useTransfer } from '../actions/useTransfer.ts';
import { useTransferToAllButMe } from '../actions/useTransferToAllButMe.ts';
import { useTransferToBanker } from '../actions/useTransferToBanker.ts';
import { useChangeBankerTo } from '../actions/useChangeBankerTo.ts';
import { useTransferAsBanker } from '../actions/useTransferAsBanker.ts';
import { useTransferAsBankerToAll } from '../actions/useTransferAsBankerToAll.ts';

export interface MainDomainProviderProps {
	children: ReactNode;
	session: Session;
	userId: string;
}

export function MainDomainProvider(props: MainDomainProviderProps) {
	const { children, session, userId } = props;

	const [me, opponents] = splitUsersToMeAndOpponents(session.users, userId);

	const balance = useMemo(() => session.transactions.reduce((acc, tr) => {
		if (tr.fromUserId === userId) {
			return acc - tr.amount;
		}
		if (tr.toUserId === userId) {
			return acc + tr.amount;
		}
		return acc;
	}, 0) + (session.startingMoney ?? 0), [session.startingMoney, session.transactions, userId]);
	
	const transfer = useTransfer(session, me, balance);
	const transferToAllButMe = useTransferToAllButMe(session, me, opponents, balance);
	const transferToBanker = useTransferToBanker(session, me, balance);

	const [role, setRole] = useState<CircumstanceRole>(CircumstanceRole.USER);

	const changeBankerTo = useChangeBankerTo(session, me);
	const transferAsBanker = useTransferAsBanker(session);
	const transferAsBankerToAll = useTransferAsBankerToAll(session);

	const asBanker: MainDomain['asBanker'] = me.isAlsoBanker ? {
		role,
		setRole,
		changeBankerTo,
		transferAsBanker,
		transferAsBankerToAll
	} : null;

	const domain: MainDomain = {
		stage: 'main',
		me,
		opponents,
		balance,
		transactions: session.transactions,
		presets: session.presets,
		transfer,
		transferToAllButMe,
		transferToBanker,
		asBanker
	}

	return (
		<DomainContext.Provider value={domain}>
			{ children }
		</DomainContext.Provider>
	);
}