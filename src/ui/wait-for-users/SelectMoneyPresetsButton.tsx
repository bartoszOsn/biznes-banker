import { Button, Divider, Grid, Modal, NumberInput, Stack, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useCallback } from 'react';

export function SelectMoneyPresetsButton() {
	const [opened, { open, close }] = useDisclosure();

	const onClose = useCallback(() => {
		close();
	}, [close]);

	return (
		<>
			<Button variant={'subtle'} color='white' onClick={open}>Select money presets</Button>
			<Modal opened={opened} onClose={onClose} title='Select money presets'>
				<Stack>
					<NumberInput mb='md' label='Money on start' placeholder='Enter amount' prefix='$' />
					<Title order={2}>Presets</Title>
					<Grid>
						<Grid.Col span={6}>
							<TextInput label='preset name' placeholder='Enter name' />
						</Grid.Col>
						<Grid.Col span={6}>
							<NumberInput label='amount' placeholder='Enter amount' prefix='$' />
						</Grid.Col>
						<Grid.Col span={12}>
							<Button fullWidth variant='light' color='blue'>Add preset</Button>
						</Grid.Col>
					</Grid>
					<Divider />
					<Button ml='auto' variant='filled'>
						Save
					</Button>
				</Stack>
			</Modal>
		</>
	)
}