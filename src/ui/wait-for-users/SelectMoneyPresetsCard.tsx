import { ActionIcon, Button, Card, Grid, NumberInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { Fragment, useCallback } from 'react';
import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import type { Preset } from '../../domain/model/Preset.ts';
import { IconTrash } from '@tabler/icons-react';

export interface SelectMoneyPresetsCardProps {
	startingMoney: number | null;
	presets: Preset[];
	onStartingMoneyChange: (startingMoney: number | null) => void;
	onPresetsChange: (preset: Preset[]) => void;
	shakeStartingMoneyLabel: boolean;
}

export function SelectMoneyPresetsCard(props: SelectMoneyPresetsCardProps) {
	const {
		startingMoney,
		presets,
		onStartingMoneyChange,
		onPresetsChange,
		shakeStartingMoneyLabel
	} = props;
	
	const domain = useDomainOfType('withoutStarting');

	if (!domain.asBanker) {
		throw new Error('This component is only for banker.');
	}

	const addPreset = useCallback(() => {
		onPresetsChange([...presets, {name: '', amount: 0}]);
	}, [onPresetsChange, presets]);

	const setPresetName = useCallback((index: number, name: string) => {
		const newPresets = [...presets];
		newPresets[index] = {...newPresets[index], name};
		onPresetsChange(newPresets);
	}, [onPresetsChange, presets]);

	const setPresetAmount = useCallback((index: number, amount: number) => {
		const newPresets = [...presets];
		newPresets[index] = {...newPresets[index], amount};
		onPresetsChange(newPresets);
	}, [onPresetsChange, presets]);

	const removePreset = useCallback((index: number) => {
		const newPresets = [...presets];
		newPresets.splice(index, 1);
		onPresetsChange(newPresets);
	}, [onPresetsChange, presets]);

	return (
		<Card w='100%' withBorder>
			<Stack>
				<NumberInput mb="md"
							 label="Money on start"
							 placeholder="Enter amount"
							 prefix="$"
							 thousandSeparator
							 value={startingMoney ?? undefined}
							 style={{
								 animationName: shakeStartingMoneyLabel ? 'shake' : undefined,
								 animationDuration: '300ms'
							 }}
							 onChange={(e) => onStartingMoneyChange(typeof e === 'number' ? e : null)}/>
				<Title order={2}>Presets</Title>
				<Grid>
					{
						presets.length === 0 && (
							<Text c="gray" w="100%" style={{textAlign: 'center'}}>No presets</Text>
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
												 onChange={(value) => setPresetAmount(index, typeof value === 'number' ? value : 0)}/>
								</Grid.Col>
								<Grid.Col span={1} style={{alignSelf: 'end'}}>
									<ActionIcon size="xs" color="red" onClick={() => removePreset(index)}>
										<IconTrash/>
									</ActionIcon>
								</Grid.Col>
							</Fragment>
						))
					}
					<Grid.Col span={12}>
						<Button fullWidth variant="light" color="blue" onClick={addPreset}>Add preset</Button>
					</Grid.Col>
				</Grid>
			</Stack>
		</Card>
	)
}