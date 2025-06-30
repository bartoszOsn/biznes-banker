import { type ReactNode } from 'react';
import { DomainContext } from './DomainContext.ts';
import { createStateMachine } from '../util/createStateMachine.tsx';
import type { DomainWithoutStarting, DomainWithoutUser, MainDomain } from './Domain.ts';
import { withoutSessionStateMachineState } from './withoutSessionStateMachineState.ts';

const StateMachine = createStateMachine({
	states: {
		withoutSession: withoutSessionStateMachineState,
		withoutUser: {
			handler: () => {
				return {
					state: {
						stage: 'withoutUser'
					} as DomainWithoutUser,
					context: [null]
				};
			}
		},
		withoutStarting:{
			handler: () => {
				return {
					state: {
						stage: 'withoutStarting'
					} as DomainWithoutStarting,
					context: [null]
				};
			}
		},
		main: {
			handler: () => {
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



