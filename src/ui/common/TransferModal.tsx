import { type MouseEvent, type ReactNode, useCallback, useState } from 'react';
import type { Preset } from '../../domain/model/Preset.ts';
import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Modal, NumberInput, Stack, Text, Textarea } from '@mantine/core';
import { Money } from '../util/Money.tsx';

export interface TransferModalProps {
	children: (onClick: (e: MouseEvent) => void) => ReactNode;
	presets: Preset[];
	title: string;
	onTransfer: (amount: number, description: string) => void;
	validate?: (amount: number) => string | ReactNode | null;
}

export function TransferModal(props: TransferModalProps) {
	const { onTransfer } = props;

	const [opened, {open, close}] = useDisclosure(false);
	const [amount, setAmount] = useState<number | undefined>(undefined);
	const [description, setDescription] = useState<string>('');

	const onClose = useCallback(() => {
		close();
		setAmount(undefined);
		setDescription('');
	}, [close]);

	const onOpen = useCallback((e: MouseEvent) => {
		e.stopPropagation();
		open();
	}, [open]);

	const transfer = useCallback((customAmount?: number, description: string = '') => {
		if (customAmount === undefined || customAmount <= 0) {
			return;
		}

		onTransfer(customAmount, description);
		onClose();
	}, [onTransfer, onClose]);

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
						transfer(amount, description);
						e.preventDefault();
					}}>
						<Stack gap="md">
							<NumberInput data-autofocus
										 label="Amount"
										 size="lg"
										 prefix="$"
										 thousandSeparator
										 value={amount}
										 error={ validate(amount) }
										 onChange={(v) => setAmount(typeof v !== 'number' ? undefined : Number(v))}/>
							<Textarea label='Description'
									  value={description}
									  onChange={e => setDescription(e.currentTarget.value)}/>
							<Group gap="xs">
								{
									props.presets.map((preset, index) => (
										<Button key={index} variant="light" size="lg" onClick={() => transfer(preset.amount, preset.name)}
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
					<Button onClick={() => transfer(amount, description)} disabled={!!validate(amount)}>Transfer</Button>
				</Stack>
			</Modal>
		</>
	)
}