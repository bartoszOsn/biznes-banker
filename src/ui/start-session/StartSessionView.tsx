import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import { Avatar, Box, Button, Image, List, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import capitalist from '../../assets/capitalist.svg';
import hero from '../../assets/hero.jpg';
import { useCallback } from 'react';
import { IconCheck, IconCurrencyDollar } from '@tabler/icons-react';

export function StartSessionView() {
	const domain = useDomainOfType('withoutSession');

	const onStartSessionClick = useCallback(() => {
		domain.startSession();
	}, [domain]);

	return (
		<Box w={'100%'}
			 mih={'100vh'}>
			<Image src={hero} alt="Hero image" style={{ filter: 'brightness(0.7)' }} h="200px"/>
			<Stack gap='md' mt={-52} px='xl' pb='xl'>
				<Avatar size={'xl'}
						radius={'md'}
						variant={'filled'}
						color='blue'
						style={{ alignSelf: 'center' }}>
					<Image src={capitalist} alt={'Capitalist Logo'}/>
				</Avatar>
				<Title>Electronic bank for the games like monopoly</Title>
				<Text c="gray">Stop using fake paper money in board games, use this online banking simulator instead, and enjoy these benefits:</Text>
				<List spacing='sm' size='sm' mb='xl' icon={
					<ThemeIcon size={20} radius="xl">
						<IconCheck size={12} stroke={1.5} />
					</ThemeIcon>
				}>
					<List.Item>
						<b>Easy money management</b> – no more lost or torn bills or problems with change.
					</List.Item>
					<List.Item>
						<b>Fast transactions</b> – transfer funds between players with just a few clicks. It can speed up the game by up to 50%.
					</List.Item>
					<List.Item>
						<b>No more cheating</b> – the app keeps track of all transactions, making it harder for players to cheat.
						You suspect someone took money from the bank? Check the transaction history!
					</List.Item>
				</List>
				<Button variant={'gradient'} size='xl' leftSection={<IconCurrencyDollar size={28} />} onClick={onStartSessionClick}>Start session</Button>
			</Stack>
		</Box>

	);
}