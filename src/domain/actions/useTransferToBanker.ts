import { useCallback } from 'react';
import { useRepository } from '../Repository.ts';
import type { Session } from '../model/Session.ts';
import type { User } from '../model/User.ts';

export function useTransferToBanker(session: Session, me: User, balance: number) {
	const { pushTransaction } = useRepository();
	
	return useCallback((amount: number, description: string = '') => {
		if (amount <= 0) {
			throw new Error('Transfer amount must be greater than zero.');
		}
		if (amount > balance) {
			throw new Error('Insufficient balance for transfer.');
		}

		pushTransaction(session.id, me.id, 'banker', amount, description).then();
	}, [balance, pushTransaction, session.id, me.id]);
}