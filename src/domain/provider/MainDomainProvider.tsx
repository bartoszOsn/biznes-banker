import type { Session } from '../model/Session.ts';
import type { MainDomain } from '../Domain.ts';
import { splitUsersToMeAndOpponents } from '../util/splitUsersToMeAndOpponents.ts';
import { type ReactNode, useCallback, useMemo, useState } from 'react';
import { DomainContext } from '../DomainContext.ts';
import { CircumstanceRole } from '../model/CircumstanceRole.ts';
import { useRepository } from '../Repository.ts';

export interface MainDomainProviderProps {
	children: ReactNode;
	session: Session;
	userId: string;
}

export function MainDomainProvider(props: MainDomainProviderProps) {
	const { children, session, userId } = props;
	const { pushBankerId, pushTransaction } = useRepository();

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
	
	const transfer = useCallback((toUserId: string, amount: number, description: string = '') => {
		if (toUserId === userId) {
			throw new Error('Cannot transfer money to yourself.');
		}
		if (amount <= 0) {
			throw new Error('Transfer amount must be greater than zero.');
		}
		if (amount > balance) {
			throw new Error('Insufficient balance for transfer.');
		}

		pushTransaction(session.id, userId, toUserId, amount, description).then();
	}, [balance, session.id, userId]);
	
	const transferToAllButMe = useCallback((amount: number, description: string = '') => {
		const wholeAmount = amount * opponents.length;
		if (amount <= 0) {
			throw new Error('Transfer amount must be greater than zero.');
		}
		if (wholeAmount > balance) {
			throw new Error('Insufficient balance for transfer.');
		}

		for (const opponent of opponents) {
			transfer(opponent.id, amount, description);
		}
	}, [balance, opponents, transfer]);
	
	const transferToBanker = useCallback((amount: number, description: string = '') => {
		if (amount <= 0) {
			throw new Error('Transfer amount must be greater than zero.');
		}
		if (amount > balance) {
			throw new Error('Insufficient balance for transfer.');
		}

		pushTransaction(session.id, userId, 'banker', amount, description).then();
	}, [balance, session.id, userId]);

	const [role, setRole] = useState<CircumstanceRole>(CircumstanceRole.USER);

	const changeBankerTo = useCallback((userId: string) => {
		if (userId === me!.id) {
			throw new Error('Cannot change banker to yourself.');
		}

		pushBankerId(session.id, userId).then();
	}, [me, session.id]);
	
	const transferAsBanker = useCallback((toUserId: string, amount: number, description: string = '') => {
		pushTransaction(session.id, 'banker', toUserId, amount, description).then();
	}, [session.id]);
	
	const transferAsBankerToAll = useCallback((amount: number, description: string = '') => {
		for (const user of session.users) {
			transferAsBanker(user.id, amount, description);
		}
	}, [session.users, transferAsBanker]);

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