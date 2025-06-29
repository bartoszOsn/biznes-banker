import { type Context, type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

export interface StateMachineDef<
	TStates extends Record<string, StateMachineState<any, any>>,
	TEdges extends Array<StateMachineEdge<TStates, keyof TStates, keyof TStates>>
> {
	states: TStates;
	edges: TEdges;
	initialState: keyof TStates;
	Context: Context<ReturnType<TStates[keyof TStates]['handler']>['state'] | null>;
}

export interface StateMachineState<
	TState,
	TContext extends any[]
> {
	handler: () => { state: TState, context: TContext };
}

export interface StateMachineEdge<
	TStates extends Record<string, StateMachineState<any, any>>,
	TFrom extends keyof TStates,
	TTo extends keyof TStates
> {
	from: TFrom;
	to: TTo;
	condition?: (context: ReturnType<TStates[TFrom]['handler']>['context']) => boolean;
}

export function useStateMachine<
	TStates extends Record<string, StateMachineState<any, any>>,
	TEdges extends Array<StateMachineEdge<TStates, keyof TStates, keyof TStates>>
>(def: StateMachineDef<TStates, TEdges>): (props: { children: ReactNode}) => ReactNode {
	const [initialDef] = useState(def);

	const Components = useMemo(() => {
		const componentsEntries = Object.entries(initialDef.states).map(([name, state]) => {
			const useHandler = state.handler;
			const Context = initialDef.Context;

			const Component = (props: { children: ReactNode, setContext: (context: ReturnType<TStates[keyof TStates]['handler']>['context']) => void }): ReactNode => {
				const {children, setContext } = props;
				const { state: currentState, context } = useHandler();

				useEffect(() => {
					if (context) {
						setContext(context);
					}
				}, [setContext, context]);

				return (
					<Context.Provider value={currentState}>
						{children}
					</Context.Provider>
				);
			};

			return [name, Component] as const;
		});

		return Object.fromEntries(componentsEntries) as Record<keyof TStates, (props: { children: ReactNode, setContext: (context: ReturnType<TStates[keyof TStates]['handler']>['context']) => void }) => ReactNode>;
	}, [initialDef]);

	return useCallback((props: { children: ReactNode}): ReactNode => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [CurrentComponent, setCurrentComponent] = useState(() =>
			Components[initialDef.initialState]
		);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [currentStateId, setCurrentStateId] = useState(initialDef.initialState);

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [currentContext, setCurrentContext] = useState<ReturnType<TStates[keyof TStates]['handler']>['context'] | null>(null);

		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(() => {
			const matchingEdge = initialDef.edges.find(edge => edge.from === currentStateId && (!edge.condition || edge.condition(currentContext || [])));
			if (matchingEdge) {
				setCurrentStateId(matchingEdge.to);
				setCurrentComponent(Components[matchingEdge.to]);
			}
		}, [currentStateId, currentContext]);

		return (
			// @ts-expect-error Types should be fine, TS went crazy here
			<CurrentComponent setContext={setCurrentContext}>
				{props.children}
			</CurrentComponent>
		)
	}, [Components, initialDef]);
}