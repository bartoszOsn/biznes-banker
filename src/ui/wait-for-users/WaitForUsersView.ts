import { useDomainOfType } from '../../domain/useDomainOfType.ts';

export function WaitForUsersView() {
	const domain = useDomainOfType('withoutStarting');

	return (
		"Link: " + domain.joinLink
	)
}