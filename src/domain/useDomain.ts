import { useContext } from 'react';
import { DomainContext } from './DomainContext.ts';
import type { Domain } from './Domain.ts';

export function useDomain(): Domain {
	const domain = useContext(DomainContext);
	if (!domain) {
		throw new Error('No domain provided.');
	}

	return domain;
}