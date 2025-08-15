import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import { Avatar, Box, Button, Image, Stack, Text, Title } from '@mantine/core';
import capitalist from '../../assets/capitalist.svg';
import dollarGrid from '../../assets/dollar-grid.webp';
import { useCallback } from 'react';
import { fireMoneyConfetti } from '../util/fireMoneyConfetti.ts';

export function StartSessionView() {
	const domain = useDomainOfType('withoutSession');

	const onStartSessionClick = useCallback(() => {
		fireMoneyConfetti();
		domain.startSession();
	}, [domain]);

	return (
		<Box style={{
			background: 'linear-gradient(45deg,var(--mantine-color-yellow-filled) 0%, var(--mantine-color-orange-filled) 100%)'
		}}>
			<Box style={{
				backgroundImage: `url(${dollarGrid})`,
				backgroundSize: '140px 140px',
				backgroundRepeat: 'repeat'
			}}>
				<Stack w={'100%'}
					   h={'100vh'}
					   px={16}
					   pt={48}
					   gap={32}
					   align={'center'}>
					<Avatar size={'xl'}
							radius={'md'}
							variant={'filled'}
							color={'red'}>
						<Image src={capitalist} alt={'Capitalist Logo'}/>
					</Avatar>
					<Title c="white" style={{textTransform: 'uppercase'}}>E-banking</Title>
					<Text c="white" style={{textAlign: 'center'}}>Electronic bank for the games like monopoly</Text>
					<Button variant={'gradient'} gradient={{from: 'red', to: 'pink', deg: 90}} onClick={onStartSessionClick}>💲Start session</Button>
				</Stack>
			</Box>
		</Box>

	);
}