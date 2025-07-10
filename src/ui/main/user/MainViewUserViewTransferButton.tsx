import type { User } from '../../../domain/model/User.ts';
import { userColorToMantine } from '../../../domain/model/UserColor.ts';
import { Button, Grid, Group, Modal, NumberInput, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useCallback, useState } from 'react';
import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import { IconBuildingBank } from '@tabler/icons-react';
import { Money } from '../../util/Money.tsx';

export interface MainViewUserViewTransferButtonProps {
	transferTo: 'all' | 'banker' | User;
}

export function MainViewUserViewTransferButton({transferTo}: MainViewUserViewTransferButtonProps) {
	const domain = useDomainOfType('main');

	const [opened, {open, close}] = useDisclosure(false);
	const [amount, setAmount] = useState<number | undefined>(undefined);

	const onClose = useCallback(() => {
		close();
		setAmount(undefined);
	}, [close]);
	
	const getRealAmount = useCallback((amount: number) => {
		if (transferTo === 'all') {
			return amount * domain.opponents.length;
		}
		return amount;
	}, [domain.balance, domain.opponents.length, transferTo]);

	const transfer = useCallback((customAmount?: number) => {
		if (customAmount === undefined) {
			customAmount = amount;
		}

		if (customAmount === undefined || customAmount <= 0) {
			return;
		}

		if (transferTo === 'all') {
			domain.transferToAllButMe(customAmount);
		} else if (transferTo === 'banker') {
			domain.transferToBanker(customAmount);
		} else {
			domain.transfer(transferTo.id, customAmount);
		}
		onClose();
	}, [domain, onClose, amount, transferTo]);

	return (
		<>
			{
				transferTo === 'all' && (
					<Grid.Col span={12}>
						<Button variant={'gradient'} size="xl" w="100%" onClick={open}>
							All of them
						</Button>
					</Grid.Col>
				)
			}
			{
				transferTo === 'banker' && (
					<Grid.Col span={12}>
						<Button leftSection={<IconBuildingBank/>} variant={'gradient'} gradient={{from: 'dark', to: 'gray'}} size="xl" w="100%" onClick={open}>
							Banker
						</Button>
					</Grid.Col>
				)
			}
			{
				typeof transferTo !== 'string' && (
					<Grid.Col span={6}>
						<Button color={userColorToMantine(transferTo.color)} size="xl" w="100%" onClick={open}>
							{transferTo.name}
						</Button>
					</Grid.Col>
				)
			}

			<Modal opened={opened} onClose={onClose} title={`Transfer to ${transferTo === 'all' ? 'everyone' : transferTo === 'banker'? 'Banker' : transferTo.name}`}>
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
										 error={
											 amount && getRealAmount(amount) > domain.balance
												 ? <Text>You don't have enough money. Missing <Money amount={getRealAmount(amount) - domain.balance}/></Text>
												 : undefined
										 }
										 onChange={(v) => setAmount(typeof v !== 'number' ? undefined : Number(v))}/>
							<Group gap="xs">
								{
									domain.presets.map((preset, index) => (
										<Button key={index} variant="light" size="lg" onClick={() => transfer(preset.amount)}
												disabled={getRealAmount(preset.amount) > domain.balance}>
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
					<Button onClick={() => transfer()} disabled={!amount || getRealAmount(amount) > domain.balance}>Transfer</Button>
				</Stack>
			</Modal>
		</>
	);
}