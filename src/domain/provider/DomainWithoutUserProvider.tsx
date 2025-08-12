import { type ReactNode } from 'react';
import type { DomainWithoutUser } from '../Domain.ts';
import { DomainContext } from '../DomainContext.ts';
import type { Session } from '../model/Session.ts';
import { useSetUserProps } from '../actions/useSetUserProps.ts';

export interface DomainWithoutUserProviderProps {
	children: ReactNode;
	session: Session;
}

export function DomainWithoutUserProvider(props: DomainWithoutUserProviderProps): ReactNode {
	const { children, session } = props;

	const setUserProps = useSetUserProps(session);

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