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
import { type ReactNode, useMemo } from 'react';
import { useFirebaseApp } from './firebase/util/useFirebaseApp.ts';
import { useUser } from './firebase/util/useUser.ts';

export function RepositoryProvider({ children }: { children: ReactNode }) {
	const { database, auth } = useFirebaseApp();
	const user = useUser(auth);

	const repository: Repository = useMemo(() => ({
		userId: user?.uid || '',
		pushBankerId: pushBankerId(database),
		pushNewSession: pushNewSession(database),
		pushNewUser: pushNewUser(database, user?.uid ?? ''),
		pushPresets: pushPresets(database),
		pushSessionStarted: pushSessionStarted(database),
		pushStartingMoney: pushStartingMoney(database),
		pushTransaction: pushTransaction(database),
		selectUserCountOnce: selectUserCountOnce(database),
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useSelectSession: useSelectSession(database),
	}), [database, user]);

	if (repository.userId === '') {
		return null;
	}

	return (
		<RepositoryContext.Provider value={repository}>
			{ children }
		</RepositoryContext.Provider>
	)
}