import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import { Avatar, Button, Image, Stack, Text, Title } from '@mantine/core';
import capitalist from '../../assets/capitalist.svg';
import { useCallback } from 'react';
import { fireMoneyConfetti } from '../util/fireMoneyConfetti.ts';

export function StartSessionView() {
	const domain = useDomainOfType('withoutSession');

	const onStartSessionClick = useCallback(() => {
		fireMoneyConfetti();
		domain.startSession();
	}, [domain.startSession]);

	return (
		<Stack w={'100%'}
			   h={'100vh'}
			   px={16}
			   pt={48}
			   gap={32}
			   align={'center'}
			   style={{
				   background: 'linear-gradient(45deg,var(--mantine-color-grape-filled) 0%, var(--mantine-color-violet-filled) 100%)'
			   }}>
			<Avatar size={'xl'}
					radius={'md'}
					variant={'gradient'}
					color={'red'}>
				<Image src={capitalist} alt={'Capitalist Logo'}/>
			</Avatar>
			<Title c='white' style={{ textTransform: 'uppercase'}}>E-banking</Title>
			<Text c='white' style={{ textAlign: 'center'}}>Electronic bank for the monopoly game</Text>
			<Button variant={'gradient'} onClick={onStartSessionClick}>Start session</Button>
		</Stack>
	);
}