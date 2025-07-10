import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import { ActionIcon, Flex, Grid, Group, Skeleton, Stack, Title } from '@mantine/core';
import { MainViewUserViewTransferButton } from './MainViewUserViewTransferButton.tsx';
import { Money } from '../../util/Money.tsx';
import { useDisclosure } from '@mantine/hooks';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';

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
			<Stack pt='xl' align='center' style={{ flexGrow: 1}}>
				<Title size='4rem'>
					<Group align='baseline' justify='center'>
						{
							showMoney
								? <Money amount={domain.balance} />
								: <Group gap={0} align='center'>$<Skeleton w='150px' h='50px' mt='sm' /></Group>
						}
						<ActionIcon variant='subtle' size='xl' color='gray' onClick={toggleShowMoney}>
							{
								showMoney ? <IconEye size='3rem' /> : <IconEyeClosed size='3rem' />
							}
						</ActionIcon>
					</Group>
				</Title>
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