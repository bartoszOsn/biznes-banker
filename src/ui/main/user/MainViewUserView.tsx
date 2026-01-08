import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import { Flex, Grid, Stack, Title } from '@mantine/core';
import { MainViewUserViewTransferButton } from './MainViewUserViewTransferButton.tsx';
import { Money } from '../../util/Money.tsx';
import { RevealableArea } from '../../../util/RevealableArea.tsx';

export function MainViewUserView() {
	const domain = useDomainOfType('main');

	return (
		<Flex w="100%"
			  direction='column'
			  gap='xl'
			   align="center"
			   px="md">
			<RevealableArea revealableContent={<Title size='4rem'><Money amount={domain.balance} /></Title>}
							 hiddenContentProps={{ style: { height: 83 } }}
							 labelToHide='Click to hide'
							 labelToReveal='Click to show'/>
			<Stack style={{ overflowY: 'clip', overflowX: 'hidden' }}>
				<Title order={3}>Transfer to player:</Title>
				<Grid>
					{
						domain.opponents.map((opponent, index) => {
							return <MainViewUserViewTransferButton key={index} transferTo={opponent}/>
						})
					}
					<Grid.Col span={12}>
						<Title order={3}>Or transfer to:</Title>
					</Grid.Col>
					<MainViewUserViewTransferButton transferTo={'all'}/>
					<MainViewUserViewTransferButton transferTo={'banker'}/>
				</Grid>
			</Stack>
		</Flex>
	)
}