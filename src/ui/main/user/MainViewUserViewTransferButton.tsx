import type { User } from '../../../domain/model/User.ts';
import { userColorToMantine } from '../../../domain/model/UserColor.ts';
import { Button, Grid, Modal, NumberInput, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useCallback, useState } from 'react';
import { useDomainOfType } from '../../../domain/useDomainOfType.ts';

export interface MainViewUserViewTransferButtonProps {
	transferTo: 'all' | User;
}

export function MainViewUserViewTransferButton({ transferTo }: MainViewUserViewTransferButtonProps) {
	const domain = useDomainOfType('main');

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
			domain.transferToAllButMe(amount);
		} else {
			domain.transfer(transferTo.id, amount);
		}
		onClose();
	}, [domain, onClose, amount, transferTo]);

	return (
		<>
			{
				typeof transferTo === 'string' && (
					<Grid.Col span={12}>
						<Button color='gray' size='xl' w='100%' onClick={open}>
							All of them
						</Button>
					</Grid.Col>
				)
			}
			{
				typeof transferTo !== 'string' && (
					<Grid.Col span={6}>
						<Button color={userColorToMantine(transferTo.color)} size='xl' w='100%' onClick={open}>
							{transferTo.name}
						</Button>
					</Grid.Col>
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