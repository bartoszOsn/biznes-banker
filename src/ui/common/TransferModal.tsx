import { type MouseEvent, type ReactNode, useCallback, useState } from 'react';
import type { Preset } from '../../domain/model/Preset.ts';
import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Modal, NumberInput, Stack, Text } from '@mantine/core';
import { Money } from '../util/Money.tsx';

export interface TransferModalProps {
	children: (onClick: (e: MouseEvent) => void) => ReactNode;
	presets: Preset[];
	title: string;
	onTransfer: (amount: number) => void;
	validate?: (amount: number) => string | ReactNode | null;
}

export function TransferModal(props: TransferModalProps) {
	const [opened, {open, close}] = useDisclosure(false);
	const [amount, setAmount] = useState<number | undefined>(undefined);

	const onClose = useCallback(() => {
		close();
		setAmount(undefined);
	}, [close]);

	const onOpen = useCallback((e: MouseEvent) => {
		e.stopPropagation();
		open();
	}, [open]);

	const transfer = useCallback((customAmount?: number) => {
		if (customAmount === undefined) {
			customAmount = amount;
		}

		if (customAmount === undefined || customAmount <= 0) {
			return;
		}

		props.onTransfer(customAmount);
		onClose();
	}, [amount, props.onTransfer, onClose]);

	const validate = (amount?: number) => {
		if (amount === undefined || amount <= 0) {
			return true;
		}

		if (props.validate) {
			return props.validate(amount);
		}

		return null;
	}

	return (
		<>
			{
				props.children(onOpen)
			}

			<Modal opened={opened} onClose={onClose} title={ props.title }>
				<Stack gap="lg">
					<form onSubmit={(e) => {
						transfer();
						e.preventDefault();
					}}>
						<Stack gap="md">
							<NumberInput data-autofocus
										 size="lg"
										 prefix="$"
										 thousandSeparator
										 value={amount}
										 error={ validate(amount) }
										 onChange={(v) => setAmount(typeof v !== 'number' ? undefined : Number(v))}/>
							<Group gap="xs">
								{
									props.presets.map((preset, index) => (
										<Button key={index} variant="light" size="lg" onClick={() => transfer(preset.amount)}
												disabled={!!props.validate?.(preset.amount)}>
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
					<Button onClick={() => transfer()} disabled={!!validate(amount)}>Transfer</Button>
				</Stack>
			</Modal>
		</>
	)
}