import type { User } from '../../../domain/model/User.ts';
import { userColorToMantine } from '../../../domain/model/UserColor.ts';
import { Button, Group, Modal, NumberInput, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useCallback, useState } from 'react';
import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import { Money } from '../../util/Money.tsx';

export interface MainViewBankerViewTransferButtonProps {
	transferTo: 'all' | User;
}

export function MainViewBankerViewTransferButton({transferTo}: MainViewBankerViewTransferButtonProps) {
	const domain = useDomainOfType('main');

	if (!domain.isBanker) {
		throw new Error('MainViewBankerViewTransferButton can only be used by the banker.');
	}

	const [opened, {open, close}] = useDisclosure(false);
	const [amount, setAmount] = useState<number | undefined>(undefined);

	const onClose = useCallback(() => {
		close();
		setAmount(undefined);
	}, [close]);

	const transfer = useCallback((customAmount?: number) => {
		if (customAmount === undefined) {
			customAmount = amount;
		}

		if (customAmount === undefined || customAmount <= 0) {
			return;
		}

		if (transferTo === 'all') {
			domain.transferAsBankerToAll(customAmount);
		} else {
			domain.transferAsBanker(transferTo.id, customAmount);
		}
		onClose();
	}, [domain, onClose, amount, transferTo]);

	return (
		<>
			{
				transferTo === 'all' && (
					<Button variant="gradient" size="xl" onClick={open}>
						All of them
					</Button>
				)
			}
			{
				typeof transferTo !== 'string' && (
					<Button color={userColorToMantine(transferTo.color)} size="xl" onClick={open}>
						{transferTo.name}
					</Button>
				)
			}

			<Modal opened={opened} onClose={onClose} title={`Transfer to ${typeof transferTo === 'string' ? 'everyone' : transferTo.name}`}>
				<Stack gap="lg">
					<form onSubmit={(e) => {transfer(); e.preventDefault();}}>
						<Stack gap="md">
						<NumberInput data-autofocus size="lg" prefix="$" thousandSeparator value={amount}
									 onChange={(v) => setAmount(typeof v !== 'number' ? undefined : Number(v))}/>
							<Group gap="xs">
								{
									domain.presets.map((preset, index) => (
										<Button key={index} variant="light" size="lg" onClick={() => transfer(preset.amount)}>
											<Stack gap="0" align="start">
												<Text size="xs" c="gray">{preset.name}</Text>
												<Text size="sm" fw="bold"><Money amount={preset.amount}/></Text>
											</Stack>
										</Button>
									))
								}
							</Group>
						</Stack>
					</form>
					<Button onClick={() => transfer()}>Transfer</Button>
				</Stack>
			</Modal>
		</>
	);
}