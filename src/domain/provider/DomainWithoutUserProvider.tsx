import { type ReactNode, useCallback } from 'react';
import type { DomainWithoutUser } from '../Domain.ts';
import type { UserColor } from '../model/UserColor.ts';
import { getUserIdLSKey } from '../util/getUserIdLSKey.ts';
import { DomainContext } from '../DomainContext.ts';
import type { Session } from '../model/Session.ts';
import { useRepository } from '../Repository.ts';

export interface DomainWithoutUserProviderProps {
	children: ReactNode;
	session: Session;
	setUserId: (userId: string | null) => void;
}

export function DomainWithoutUserProvider(props: DomainWithoutUserProviderProps): ReactNode {
	const { children, session, setUserId } = props;
	const { pushNewUser, selectUserCountOnce } = useRepository();

	const setUserProps = useCallback((name: string, color: UserColor) => {
		selectUserCountOnce(session.id)
			.then((userCount) => {
				const isBanker = userCount === 0;
				return pushNewUser(session.id, name, color, isBanker);
			})
			.then((userId) => {
				const lsKey = getUserIdLSKey(session.id);
				localStorage.setItem(lsKey, userId);
				setUserId(userId);
				return userId;
			});
	}, [session.id, setUserId])

	const domain: DomainWithoutUser = {
		stage: 'withoutUser',
		setUserProps
	};

	return (
		<DomainContext.Provider value={domain}>
			{children}
		</DomainContext.Provider>
	)
}