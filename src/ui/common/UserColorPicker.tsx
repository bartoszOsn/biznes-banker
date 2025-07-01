import { UserColor, userColorToMantine } from '../../domain/model/UserColor.ts';
import { useMemo } from 'react';
import { CheckIcon, ColorSwatch, Flex, UnstyledButton } from '@mantine/core';

export interface UserColorPickerProps {
	value?: UserColor;
	onChange?: (color: UserColor) => void;
}

export function UserColorPicker(props: UserColorPickerProps) {
	const colorValues = useMemo(() => {
		return Object.values(UserColor) as UserColor[];
	}, []);

	return (
		<Flex gap={10} align={'center'} justify='center' wrap='wrap' maw={160}>
			{
				colorValues.map((color) => (
					<UnstyledButton onClick={() => props.onChange?.(color)} key={color}>
						<ColorSwatch color={userColorToMantine(color)} c={color === 'white' ? 'var(--mantine-color-gray-7)' : 'var(--mantine-color-gray-2)'} withShadow={true} style={{ cursor: 'pointer'}}>
						{
							props.value === color && <CheckIcon size={16} />
						}
							</ColorSwatch>
					</UnstyledButton>
				))
			}
		</Flex>
	)
}