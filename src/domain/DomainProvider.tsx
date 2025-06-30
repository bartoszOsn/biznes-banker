import { type ReactNode } from 'react';
import { DomainContext } from './DomainContext.ts';
import { createStateMachine } from '../util/createStateMachine.tsx';
import type { DomainWithoutStarting, DomainWithoutUser, MainDomain } from './Domain.ts';
import { withoutSessionStateMachineState } from './withoutSessionStateMachineState.ts';
import { withoutUserStateMachineState } from './withoutUserStateMachineState.ts';

const StateMachine = createStateMachine({
	states: {
		withoutSession: withoutSessionStateMachineState,
		withoutUser: withoutUserStateMachineState,
		withoutStarting:{
			useHandler: () => {
				return {
					state: {
						stage: 'withoutStarting'
					} as DomainWithoutStarting,
					context: [null]
				};
			}
		},
		main: {
			useHandler: () => {
				return {
					state: {
						stage: 'main'
					} as MainDomain,
					context: [null]
				};
			}
		}
	},
	edges: [
		{
			from: 'withoutSession',
			to: 'withoutUser',
			condition: ([sessionId]) => sessionId !== null,
		},
		{
			from: 'withoutUser',
			to: 'withoutSession',
			condition: ([sessionId]) => sessionId === null,
		},
		{
			from: 'withoutUser',
			to: 'withoutStarting',
			condition: ([sessionId, userId]) => sessionId !== null && userId !== null,
		}
	],
	initialState: 'withoutSession',
	Context: DomainContext
});

export function DomainProvider({children}: { children: ReactNode }) {
	return (
		<StateMachine>
			{ children }
		</StateMachine>
	)
}



