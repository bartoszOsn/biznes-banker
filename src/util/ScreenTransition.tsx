import { Children, type ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { Box } from '@mantine/core';

export interface ScreenTransitionProps {
	children: ReactNode;
	transitionDuration?: number;
}

let html: string | undefined = undefined;
const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.inset = '0';
overlay.style.zIndex = '9999999';
overlay.style.pointerEvents = 'none';
overlay.style.background = 'black';
overlay.style.opacity = '0';
document.body.appendChild(overlay);

// Component is written in a way that it can be used only once in the app.
// Because of lazyness of the developer...
// It's because I can't store these global properties above as a ref, because due to providers higher in the tree,
// the component will be remounted and the ref will be reset.
export function ScreenTransition({ children, transitionDuration = 300 }: ScreenTransitionProps) {
	const boxRef = useRef<HTMLDivElement | null>(null);
	const [state, setState] = useState<TransitionState>({ type: 'revealed' });

	if (boxRef.current?.innerHTML) {
		html = boxRef.current?.innerHTML;
	}

	useLayoutEffect(() => {
		overlay.style.transition = `opacity ${transitionDuration}ms ease-in-out`;
	}, [transitionDuration]);

	// TODO: sometimes the html is not captured correctly, namely when there is transition from login to lobby.
	useLayoutEffect(() => {
		if (!boxRef.current || !html) return;

		setState({ type: 'exiting', freezedHtml: html });
		overlay.style.opacity = '1';
		const timeout = setTimeout(() => {
			setState({ type: 'revealed' });
			overlay.style.opacity = '0';
		}, transitionDuration);

		return () => clearTimeout(timeout);
	}, [transitionDuration, ...Children.toArray(children).map((child: unknown | { key?: string }) => child && typeof child === 'object' && 'key' in child && child.key)]);

	return (
		<>
		<Box ref={boxRef}>
				{state.type === 'revealed' && children}
				{ state.type === 'exiting' && (
					<Box w={'100%'}
						 h={'100vh'}
						 style={{overflow: 'hidden'}}
						 dangerouslySetInnerHTML={{ __html: state.freezedHtml }} />
				)}
			</Box>
		</>
	);
}

type TransitionState = { type: 'revealed' }
	| { type: 'exiting'; freezedHtml: string }