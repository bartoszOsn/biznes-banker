import { useDomainOfType } from '../../domain/useDomainOfType.ts';

export function StartSessionView() {
	const domain = useDomainOfType('withoutSession');

	return (
		<div>
			<h1>Start a new session</h1>
			<p>Click the button below to start a new session.</p>
			<button onClick={() => domain.startSession()}>Start Session</button>
		</div>
	);
}