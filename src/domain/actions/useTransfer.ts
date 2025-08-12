import { useCallback } from 'react';
import type { User } from '../model/User.ts';
import { useRepository } from '../Repository.ts';
import type { Session } from '../model/Session.ts';

export function useTransfer(session: Session, me: User, balance: number) {
	const { pushTransaction } = useRepository();
	
	return useCallback((toUserId: string, amount: number, description: string = '') => {
		if (toUserId === me.id) {
			throw new Error('Cannot transfer money to yourself.');
		}
		if (amount <= 0) {
			throw new Error('Transfer amount must be greater than zero.');
		}
		if (amount > balance) {
			throw new Error('Insufficient balance for transfer.');
		}

		pushTransaction(session.id, me.id, toUserId, amount, description).then();
	}, [me.id, balance, pushTransaction, session.id]);
}