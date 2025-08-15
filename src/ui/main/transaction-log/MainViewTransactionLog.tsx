import { Group, Modal, Text, Timeline, UnstyledButton } from '@mantine/core';
import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import { MainViewTransactionLogTransaction } from './MainViewTransactionLogTransaction.tsx';
import { useDisclosure } from '@mantine/hooks';
import { MainViewTransactionIcon } from './MainViewTransactionIcon.tsx';
import type { MainDomain } from '../../../domain/Domain.ts';
import { useEffect } from 'react';
import { useSoundPlayer } from '../../util/SoundPlayerProvider.tsx';
import { MainViewTransactionLogTime } from './MainViewTransactionLogTime.tsx';

export function MainViewTransactionLog() {
	const domain = useDomainOfType('main');
	const [opened, { open, close }] = useDisclosure(false);

	useSoundEffectOnMoney(domain);

	return (
		<>
			<UnstyledButton w='100%' h='100%' px='md' py='sm' onClick={open}>
				{
					domain.transactions.length > 0
						? <Group>
							<MainViewTransactionIcon transaction={domain.transactions[domain.transactions.length - 1]} />
							<MainViewTransactionLogTime time={domain.transactions[domain.transactions.length - 1].timestamp} targetColor='var(--mantine-color-dimmed)' />
							<MainViewTransactionLogTransaction transaction={domain.transactions[domain.transactions.length - 1]} />
						</Group>
						: <span>No transactions yet</span>
				}
			</UnstyledButton>
			<Modal opened={opened} onClose={close} title='Transaction Log' size='xl'>
				{
					domain.transactions.length > 0
						? <Timeline>
							{
								[...domain.transactions].reverse().map((transaction, index) => (
									<Timeline.Item key={index} bullet={<MainViewTransactionIcon transaction={transaction} /> } title={<MainViewTransactionLogTransaction transaction={transaction} />}>
										{
											transaction.description && <Text c="dimmed" size="sm">{transaction.description}</Text>
										}
										<MainViewTransactionLogTime time={transaction.timestamp} targetColor='var(--mantine-color-text)' />
									</Timeline.Item>
								))
							}
						</Timeline>
						: <span>No transactions yet</span>
				}
			</Modal>
		</>
	)
}

function useSoundEffectOnMoney(domain: MainDomain): void {
	const { playMoneySound } = useSoundPlayer();
	const lastTransaction = domain.transactions[domain.transactions.length - 1];

	useEffect(() => {
		if (lastTransaction && lastTransaction.toUserId === domain.me.id) {
			playMoneySound();
		}
	}, [lastTransaction?.toUserId, lastTransaction?.timestamp, domain.me.id]);
}