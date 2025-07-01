import type { Domain } from './Domain.ts';
import { useDomain } from './useDomain.ts';

export function useDomainOfType<TType extends Domain['stage']>(type: TType): Domain & { stage: TType } {
	const domain = useDomain();
	if (domain.stage !== type) {
		throw new Error(`Expected domain of type ${type}, but got ${domain.stage}`);
	}
	return domain as Domain & { stage: TType };
}