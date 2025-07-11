import { Center, UnstyledButton } from '@mantine/core';
import type { ComponentProps, ReactNode } from 'react';
import { IconEyeOff } from '@tabler/icons-react';

export function HiddenButton<C = 'button'>(props: Omit<ComponentProps<typeof UnstyledButton<C>>, 'children'>): ReactNode {
	const c1 = 'var(--mantine-color-blue-1)';
	const c2 = 'var(--mantine-color-blue-2)';

	const styleObj = {
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
		<UnstyledButton {...props as any} style={styleObj}>
			<Center w="100%" h="100%" c='dark'>
				<IconEyeOff size="48"/>
			</Center>
		</UnstyledButton>
	)
}