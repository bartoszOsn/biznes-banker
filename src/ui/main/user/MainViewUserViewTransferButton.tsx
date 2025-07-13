import type { User } from '../../../domain/model/User.ts';
import { userColorToMantine } from '../../../domain/model/UserColor.ts';
import { Button, Grid } from '@mantine/core';
import { useCallback } from 'react';
import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import { IconBuildingBank } from '@tabler/icons-react';
import { TransferModal, type TransferModalProps } from '../../common/TransferModal.tsx';
import { Money } from '../../util/Money.tsx';

export interface MainViewUserViewTransferButtonProps {
	transferTo: 'all' | 'banker' | User;
}

export function MainViewUserViewTransferButton({transferTo}: MainViewUserViewTransferButtonProps) {
	const domain = useDomainOfType('main');

	const transfer = useCallback((amount: number) => {
		if (transferTo === 'all') {
			domain.transferToAllButMe(amount);
		} else if (transferTo === 'banker') {
			domain.transferToBanker(amount);
		} else {
			domain.transfer(transferTo.id, amount);
		}
	}, [domain, transferTo]);

	const validate = useCallback((amount: number) => {
		const realAmount = transferTo ==='all' ? amount * domain.opponents.length : amount;
		if (domain.balance < realAmount) {
			return (
				<>
					You do not have enough money. Missing <Money amount={domain.balance - realAmount} />
				</>
			);
		}
	}, [domain.balance, domain.opponents.length, transferTo]);

	const children: TransferModalProps['children'] = (onClick) => {
		if (transferTo === 'all') {
			return (
				<Grid.Col span={12}>
					<Button variant={'gradient'} size="xl" w="100%" onClick={onClick}>
						All of them
					</Button>
				</Grid.Col>
			);
		}

		if(transferTo === 'banker') {
			return (
				<Grid.Col span={12}>
					<Button leftSection={<IconBuildingBank/>} variant={'gradient'} gradient={{from: 'dark', to: 'gray'}} size="xl" w="100%" onClick={onClick}>
						Banker
					</Button>
				</Grid.Col>
			);
		}

		return (
			<Grid.Col span={6}>
				<Button color={userColorToMantine(transferTo.color)} size="xl" w="100%" onClick={onClick}>
					{transferTo.name}
				</Button>
			</Grid.Col>
		);
	}

	return (
		<TransferModal presets={domain.presets}
					   title={`Transfer to ${transferTo === 'all' ? 'everyone' : transferTo === 'banker' ? 'Banker' : transferTo.name}`}
					   validate={validate}
					   onTransfer={transfer}>
			{ children }
		</TransferModal>
	);
}