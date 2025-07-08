import { Group, List, Modal, UnstyledButton } from '@mantine/core';
import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import { MainViewTransactionLogTransaction } from './MainViewTransactionLogTransaction.tsx';
import { useDisclosure } from '@mantine/hooks';
import { MainViewTransactionIcon } from './MainViewTransactionIcon.tsx';
import type { MainDomain } from '../../../domain/Domain.ts';
import { useEffect } from 'react';
import { useSoundPlayer } from '../../util/SoundPlayerProvider.tsx';

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
							<MainViewTransactionLogTransaction transaction={domain.transactions[domain.transactions.length - 1]} />
						</Group>
						: <span>No transactions yet</span>
				}
			</UnstyledButton>
			<Modal opened={opened} onClose={close} title='Transaction Log' size='xl'>
				{
					domain.transactions.length > 0
						? <List>
							{
								domain.transactions.map((transaction, index) => (
									<List.Item key={index} icon={<MainViewTransactionIcon transaction={transaction} /> }>
										<MainViewTransactionLogTransaction transaction={transaction} />
									</List.Item>
								))
							}
						</List>
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