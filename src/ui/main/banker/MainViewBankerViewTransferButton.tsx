import type { User } from '../../../domain/model/User.ts';
import { userColorToMantine } from '../../../domain/model/UserColor.ts';
import { Button, Modal, NumberInput, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useCallback, useState } from 'react';
import { useDomainOfType } from '../../../domain/useDomainOfType.ts';

export interface MainViewBankerViewTransferButtonProps {
	transferTo: 'all' | User;
}

export function MainViewBankerViewTransferButton({ transferTo }: MainViewBankerViewTransferButtonProps) {
	const domain = useDomainOfType('main');

	if (!domain.isBanker) {
		throw new Error('MainViewBankerViewTransferButton can only be used by the banker.');
	}

	const [opened, { open, close }] = useDisclosure(false);
	const [amount, setAmount] = useState<number | undefined>(undefined);

	const onClose = useCallback(() => {
		close();
		setAmount(undefined);
	}, [close]);

	const transfer = useCallback(() => {
		if (amount === undefined || amount <= 0) {
			return;
		}

		if (transferTo === 'all') {
			domain.transferAsBankerToAll(amount);
		} else {
			domain.transferAsBanker(transferTo.id, amount);
		}
		onClose();
	}, [domain, onClose, amount, transferTo]);

	return (
		<>
			{
				transferTo === 'all' && (
					<Button variant='gradient' size='xl' onClick={open}>
						All of them
					</Button>
				)
			}
			{
				typeof transferTo !== 'string' && (
					<Button color={userColorToMantine(transferTo.color)} size='xl' onClick={open}>
						{transferTo.name}
					</Button>
				)
			}

			<Modal opened={opened} onClose={onClose} title={`Transfer to ${typeof transferTo === 'string' ? 'everyone' : transferTo.name}`}>
				<Stack gap='lg'>
					<NumberInput data-autofocus size='lg' prefix='$' thousandSeparator value={amount} onChange={(v) => setAmount(typeof v !== 'number' ? undefined : Number(v))} />
					<Button onClick={transfer}>Transfer</Button>
				</Stack>
			</Modal>
		</>
	);
}