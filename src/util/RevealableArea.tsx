import { Box, type BoxProps, type PolymorphicComponentProps, Text, UnstyledButton, type UnstyledButtonProps, useMantineTheme } from '@mantine/core';
import { type MouseEvent as ReactMouseEvent, type ReactNode, useCallback, useMemo, useState } from 'react';

export interface RevealableAreaProps extends PolymorphicComponentProps<'button', UnstyledButtonProps> {
	hiddenContentProps?: BoxProps;
	revealableContent: ReactNode;
	labelToHide?: string;
	labelToReveal?: string;
}

export function RevealableArea(props: RevealableAreaProps) {
	const { hiddenContentProps, revealableContent, labelToHide, labelToReveal, ...unstyledButtonProps } = props;
	
	const [revealed, setRevealed] = useState(false);
	const theme = useMantineTheme();
	const unstyledButtonOnClick = useCallback((e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
		setRevealed((prev) => !prev);
		unstyledButtonProps.onClick?.(e);
	}, [unstyledButtonProps]);
	const unstyledButtonStyle = useMemo(() => ({
		...unstyledButtonProps.style,
		display: 'flex',
		flexDirection: 'column',
		paddingTop: theme.spacing.xl,
		alignItems: 'center',
		width: '100%'
	} as const), [theme.spacing.xl, unstyledButtonProps.style])

	return (
		<UnstyledButton { ...unstyledButtonProps } style={unstyledButtonStyle} onClick={unstyledButtonOnClick}>
			{
				revealed
					? revealableContent
					: <HiddenContent {...hiddenContentProps} />
			}
			<Text c='dimmed'>{revealed ? labelToHide : labelToReveal }</Text>
		</UnstyledButton>
	)
}

function HiddenContent(props: BoxProps) {
	const c1 = 'var(--mantine-color-gray-1)';
	const c2 = 'var(--mantine-color-gray-2)';

	const styleObj = {
		width: '100%',
		...props.style,
		backgroundImage: `repeating-linear-gradient(
		  45deg,
		  ${c1},
		  ${c1} 10px,
		  ${c2} 10px,
		  ${c2} 20px
		)`,
	}

	return (
		<Box {...props } style={styleObj} />
	)
}