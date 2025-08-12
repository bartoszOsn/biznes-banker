import { useMemo } from 'react';
import type { Session } from '../model/Session.ts';
import type { User } from '../model/User.ts';

export function useBalance(session: Session, me: User) {
	return useMemo(() => session.transactions.reduce((acc, tr) => {
		if (tr.fromUserId === me.id) {
			return acc - tr.amount;
		}
		if (tr.toUserId === me.id) {
			return acc + tr.amount;
		}
		return acc;
	}, 0) + (session.startingMoney ?? 0), [session.startingMoney, session.transactions, me.id]);
}