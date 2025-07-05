import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import { Grid, Stack, Text, Title } from '@mantine/core';
import { MainViewUserViewTransferButton } from './MainViewUserViewTransferButton.tsx';

export function MainViewUserView() {
	const domain = useDomainOfType('main');

	return (
		<Stack w='100%' justify='space-between' align='center' px='md'>
			<Title>${domain.balance}</Title>
			<Text>Transfer to:</Text>
			<Grid>
				{
					domain.opponents.map((opponent, index) => {
						return <MainViewUserViewTransferButton key={index} transferTo={opponent} />
					})
				}
				<MainViewUserViewTransferButton transferTo={'all'} />
			</Grid>
		</Stack>
	)
}