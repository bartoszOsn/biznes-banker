import { ActionIcon, Button, Divider, Grid, Modal, NumberInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import type { Preset } from '../../domain/model/Preset.ts';
import { IconTrash } from '@tabler/icons-react';

export function SelectMoneyPresetsButton() {
	const domain = useDomainOfType('withoutStarting');

	if (!domain.asBanker) {
		throw new Error('This component is only for banker.');
	}

	const [opened, { open, close }] = useDisclosure();
	const [startingMoney, setStartingMoney] = useState<number | null>(null);
	const [presets, setPresets] = useState<Preset[]>([]);

	useEffect(() => {
		if (opened && domain.asBanker) {
			setStartingMoney(domain.asBanker.startingMoney);
			setPresets(domain.asBanker.presets);
		}
	}, [domain.asBanker, opened]);

	const onClose = useCallback(() => {
		close();
	}, [close]);

	const addPreset = useCallback(() => {
		setPresets((prev) => [...prev, { name: '', amount: 0 }]);
	}, []);

	const setPresetName = useCallback((index: number, name: string) => {
		setPresets((prev) => {
			const newPresets = [...prev];
			newPresets[index] = {...newPresets[index], name};
			return newPresets;
		});
	}, []);

	const setPresetAmount = useCallback((index: number, amount: number) => {
		setPresets((prev) => {
			const newPresets = [...prev];
			newPresets[index] = {...newPresets[index], amount};
			return newPresets;
		});
	}, []);

	const removePreset = useCallback((index: number) => {
		setPresets((prev) => {
			const newPresets = [...prev];
			newPresets.splice(index, 1);
			return newPresets;
		});
	}, []);
	
	const onSave = useCallback(() => {
		if (domain.asBanker) {
			domain.asBanker.setStartingMoney(startingMoney);
			domain.asBanker.setPresets(presets);
		}
		onClose();
	}, [domain.asBanker, onClose, presets, startingMoney]);

	return (
		<>
			<Button variant={'subtle'} color='white' onClick={open}>Select money presets</Button>
			<Modal opened={opened} onClose={onClose} title='Select money presets'>
				<Stack>
					<NumberInput mb="md"
								 label="Money on start"
								 placeholder="Enter amount"
								 prefix="$"
								 thousandSeparator
								 value={startingMoney ?? undefined}
								 onChange={(e) => setStartingMoney( typeof e === 'number' ? e : null)}/>
					<Title order={2}>Presets</Title>
					<Grid>
						{
							presets.length === 0 && (
								<Text c='gray' w='100%' style={{ textAlign: 'center'}}>No presets</Text>
							)
						}
						{
							presets.map((preset, index) => (
								<Fragment key={index}>
									<Grid.Col span={6}>
										<TextInput label="preset name"
												   placeholder="Enter name"
												   value={preset.name}
												   onChange={(e) => setPresetName(index, e.target.value)}/>
									</Grid.Col>
									<Grid.Col span={5}>
										<NumberInput label="amount"
													 placeholder="Enter amount"
													 prefix="$"
													 thousandSeparator
													 value={preset.amount}
													 onChange={(value) => setPresetAmount(index, typeof value === 'number'?  value : 0)}/>
									</Grid.Col>
									<Grid.Col span={1} style={{ alignSelf: 'end'}}>
										<ActionIcon size='xs' color='red' onClick={() => removePreset(index)}>
											<IconTrash />
										</ActionIcon>
									</Grid.Col>
								</Fragment>
							))
						}
						<Grid.Col span={12}>
							<Button fullWidth variant='light' color='blue' onClick={addPreset}>Add preset</Button>
						</Grid.Col>
					</Grid>
					<Divider />
					<Button ml='auto' variant='filled' onClick={onSave}>
						Save
					</Button>
				</Stack>
			</Modal>
		</>
	)
}