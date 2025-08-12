import { useCallback } from 'react';
import type { Session } from '../model/Session.ts';
import type { User } from '../model/User.ts';
import { useTransfer } from './useTransfer.ts';

export function useTransferToAllButMe(session: Session, me: User, opponents: User[], balance: number) {
	const transfer = useTransfer(session, me, balance);

	return useCallback((amount: number, description: string = '') => {
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
}