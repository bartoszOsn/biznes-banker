import { type ReactNode } from 'react';
import { DomainContext } from './DomainContext.ts';
import { createStateMachine } from '../util/createStateMachine.tsx';
import type { Domain } from './Domain.ts';

const StateMachine = createStateMachine({
	states: {
		withoutSession: {
			handler: () => {
				return { state: 'withoutSession' as unknown as Domain, context: [null] as [sessionId: string | null] };
			}
		},
		withoutUser: {
			handler: () => {
				return { state: 'withoutUser' as unknown as Domain, context: [] as [] };
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



