import type { StateMachineState } from '../util/createStateMachine.tsx';
import type { MainDomain } from './Domain.ts';

export const mainStateMachineState = {
	useHandler: () => {
		return {
			state: {
				stage: 'main'
			} as MainDomain,
			context: [null]
		};
	}
} satisfies StateMachineState<unknown, unknown[]>;