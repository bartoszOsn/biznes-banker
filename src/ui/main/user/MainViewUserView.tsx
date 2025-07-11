import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import { Flex, Grid, Stack, Text, Title } from '@mantine/core';
import { MainViewUserViewTransferButton } from './MainViewUserViewTransferButton.tsx';
import { Money } from '../../util/Money.tsx';
import { useDisclosure } from '@mantine/hooks';
import { HiddenButton } from '../../../util/HiddenButton.tsx';

export function MainViewUserView() {
	const domain = useDomainOfType('main');
	const [showMoney, { toggle: toggleShowMoney }] = useDisclosure(false);

	return (
		<Flex w="100%"
			   h="calc(100dvh - var(--app-shell-header-offset) - var(--app-shell-padding) * 2 - var(--app-shell-footer-height))"
			  direction='column'
			   justify="space-between"
			   align="center"
			   px="md">
			<Stack pt='xl' align='center' w='100%' style={{ flexGrow: 1}} onClick={toggleShowMoney}>
				{
					showMoney
						? <Title size='4rem'><Money amount={domain.balance} /></Title>
						: <HiddenButton w='100%' h={83} />
				}
				<Text c='dimmed'>Click to { showMoney ? 'hide' : 'show'}</Text>
			</Stack>
			<Stack mah='100%' style={{ overflowY: 'auto', overflowX: 'hidden' }}>
				<Title order={3}>Transfer to:</Title>
				<Grid>
					{
						domain.opponents.map((opponent, index) => {
							return <MainViewUserViewTransferButton key={index} transferTo={opponent}/>
						})
					}
					<MainViewUserViewTransferButton transferTo={'all'}/>
					<MainViewUserViewTransferButton transferTo={'banker'}/>
				</Grid>
			</Stack>
		</Flex>
	)
}