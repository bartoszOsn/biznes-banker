import { type ReactNode, useCallback } from 'react';
import type { DomainWithoutUser } from '../Domain.ts';
import type { UserColor } from '../model/UserColor.ts';
import { DomainContext } from '../DomainContext.ts';
import type { Session } from '../model/Session.ts';
import { useRepository } from '../Repository.ts';

export interface DomainWithoutUserProviderProps {
	children: ReactNode;
	session: Session;
}

export function DomainWithoutUserProvider(props: DomainWithoutUserProviderProps): ReactNode {
	const { children, session } = props;
	const { pushNewUser, selectUserCountOnce } = useRepository();

	const setUserProps = useCallback((name: string, color: UserColor) => {
		selectUserCountOnce(session.id)
			.then((userCount) => {
				const isBanker = userCount === 0;
				return pushNewUser(session.id, name, color, isBanker);
			});
	}, [pushNewUser, selectUserCountOnce, session.id]);

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