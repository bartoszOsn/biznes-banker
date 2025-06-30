import type { StateMachineState } from '../util/createStateMachine.tsx';
import type { DomainWithoutStarting } from './Domain.ts';

export const withoutStartingStateMachineState = {
	useHandler: () => {
		return {
			state: {
				stage: 'withoutStarting'
			} as DomainWithoutStarting,
			context: [null]
		};
	}
} satisfies StateMachineState<unknown, unknown[]>