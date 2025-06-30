import { type Context, type ReactNode, useEffect, useState } from 'react';

export interface StateMachineDef<
	TStates extends Record<string, StateMachineState<any, any>>,
	TEdges extends Array<StateMachineEdge<TStates, keyof TStates, keyof TStates>>
> {
	states: TStates;
	edges: TEdges;
	initialState: keyof TStates;
	Context: Context<ReturnType<TStates[keyof TStates]['useHandler']>['state'] | null>;
}

export interface StateMachineState<
	TState,
	TContext extends any[]
> {
	useHandler: () => { state: TState, context: TContext };
}

export interface StateMachineEdge<
	TStates extends Record<string, StateMachineState<any, any>>,
	TFrom extends keyof TStates,
	TTo extends keyof TStates
> {
	from: TFrom;
	to: TTo;
	condition: (context: ReturnType<TStates[TFrom]['useHandler']>['context']) => boolean;
}

export function createStateMachine<
	TStates extends Record<string, StateMachineState<any, any>>,
	TEdges extends Array<StateMachineEdge<TStates, keyof TStates, keyof TStates>>
>(def: StateMachineDef<TStates, TEdges>): (props: { children: ReactNode }) => ReactNode {
	const componentsEntries = Object.entries(def.states).map(([name, state]) => {
		const useHandler = state.useHandler;
		const Context = def.Context;

		const Component = (props: {
			children: ReactNode,
			setContext: (context: ReturnType<TStates[keyof TStates]['useHandler']>['context']) => void
		}): ReactNode => {
			const {children, setContext} = props;
			const {state: currentState, context} = useHandler();

			useEffect(() => {
				if (context) {
					setContext(context);
				}
			}, [...context]);

			return (
				<Context.Provider value={currentState}>
					{children}
				</Context.Provider>
			);
		};

		return [name, Component] as const;
	});

	const Components = Object.fromEntries(componentsEntries) as Record<keyof TStates, (props: {
		children: ReactNode,
		setContext: (context: ReturnType<TStates[keyof TStates]['useHandler']>['context']) => void
	}) => ReactNode>;

	return (props: { children: ReactNode }): ReactNode => {
		const [currentStateId, setCurrentStateId] = useState(def.initialState);
		const CurrentComponent = Components[currentStateId];

		const [currentContext, setCurrentContext] = useState<ReturnType<TStates[keyof TStates]['useHandler']>['context'] | null>(null);

		useEffect(() => {
			const matchingEdge = def.edges.find(edge => {
					if (!currentContext) {
						return false;
					}

					if (edge.from !== currentStateId) {
						return false;
					}

					return edge.condition(currentContext);
				}
			);
			if (matchingEdge) {
				setCurrentStateId(matchingEdge.to);
				setCurrentContext(null);
			}
		}, [currentStateId, currentContext]);

		return (
			// @ts-expect-error Types should be fine, TS went crazy here
			<CurrentComponent setContext={setCurrentContext}>
				{props.children}
			</CurrentComponent>
		)
	};
}