import { type ReactNode } from 'react';
import { DomainContext } from './DomainContext.ts';
import { createStateMachine } from '../util/createStateMachine.tsx';
import { withoutSessionStateMachineState } from './withoutSessionStateMachineState.ts';
import { withoutUserStateMachineState } from './withoutUserStateMachineState.ts';
import { withoutStartingStateMachineState } from './withoutStartingStateMachineState.ts';
import { mainStateMachineState } from './mainStateMachineState.ts';

const StateMachine = createStateMachine({
	states: {
		withoutSession: withoutSessionStateMachineState,
		withoutUser: withoutUserStateMachineState,
		withoutStarting: withoutStartingStateMachineState,
		main: mainStateMachineState
	},
	edges: [
		{
			from: 'withoutSession',
			to: 'withoutUser',
			condition: ([sessionId]) => sessionId !== null,
		},
		{
			from: 'withoutUser',
			to: 'withoutStarting',
			condition: ([sessionId, userId]) => sessionId !== null && userId !== null,
		},
		{
			from: 'withoutStarting',
			to: 'main',
			condition: ([sessionId, userId, sessionStarted]) => sessionId !== null && userId !== null && sessionStarted === true
		},

		// Returns without session
		{
			from: 'withoutUser',
			to: 'withoutSession',
			condition: ([sessionId]) => sessionId === null,
		},
		{
			from: 'withoutStarting',
			to: 'withoutSession',
			condition: ([sessionId]) => sessionId === null,
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



