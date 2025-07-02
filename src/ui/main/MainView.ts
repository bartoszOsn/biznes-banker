import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import type { MainDomain } from '../../domain/Domain.ts';

export function MainView() {
	const domain: MainDomain = useDomainOfType('main');

	return "Main View Component";
}