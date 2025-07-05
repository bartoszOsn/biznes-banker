import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import { Stack, Text, Title } from '@mantine/core';

export function MainViewUserView() {
	const domain = useDomainOfType('main');

	return (
		<Stack w='100%' justify='space-between' align='center' px='md'>
			<Title>${domain.balance}</Title>
			<Text>Transfer to:</Text>
		</Stack>
	)
}