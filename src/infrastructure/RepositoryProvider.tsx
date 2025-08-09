import { type Repository, RepositoryContext } from '../domain/Repository.ts';
import { pushBankerId } from './firebase/pushBankerId.ts';
import { pushNewSession } from './firebase/pushNewSession.ts';
import { pushNewUser } from './firebase/pushNewUser.ts';
import { pushSessionStarted } from './firebase/pushSessionStarted.ts';
import { pushTransaction } from './firebase/pushTransaction.ts';
import { useSelectSession } from './firebase/useSelectSession.ts';
import { pushStartingMoney } from './firebase/pushStartingMoney.ts';
import { pushPresets } from './firebase/pushPresets.ts';
import { selectUserCountOnce } from './firebase/selectUserCountOnce.ts';
import type { ReactNode } from 'react';

export function RepositoryProvider({ children }: { children: ReactNode }) {
	const repository: Repository = {
		pushBankerId,
		pushNewSession,
		pushNewUser,
		pushPresets,
		pushSessionStarted,
		pushStartingMoney,
		pushTransaction,
		selectUserCountOnce,
		useSelectSession,
	};

	return (
		<RepositoryContext.Provider value={repository}>
			{ children }
		</RepositoryContext.Provider>
	)
}