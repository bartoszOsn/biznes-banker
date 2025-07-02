import { type ReactNode, useEffect, useState } from 'react';
import { DomainContext } from './DomainContext.ts';
import type { Domain } from './Domain.ts';
import { selectDomain } from './selectDomain.ts';

export function DomainProvider({children}: { children: ReactNode }) {
	const [domain, setDomain] = useState<Domain | null>(null);

	useEffect(() => {
		const sub = selectDomain()
			.subscribe(domain => setDomain(domain));

		return () => sub.unsubscribe();
	}, []);

	if (!domain) {
		return null;
	}

	return (
		<DomainContext.Provider value={domain}>
			{ children }
		</DomainContext.Provider>
	);
}



