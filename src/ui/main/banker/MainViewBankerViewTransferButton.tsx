import type { User } from '../../../domain/model/User.ts';
import { userColorToMantine } from '../../../domain/model/UserColor.ts';
import { Button } from '@mantine/core';
import { useCallback } from 'react';
import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import { TransferModal, type TransferModalProps } from '../../common/TransferModal.tsx';

export interface MainViewBankerViewTransferButtonProps {
	transferTo: 'all' | User;
}

export function MainViewBankerViewTransferButton({transferTo}: MainViewBankerViewTransferButtonProps) {
	const domain = useDomainOfType('main');

	if (!domain.isBanker) {
		throw new Error('MainViewBankerViewTransferButton can only be used by the banker.');
	}

	const transfer = useCallback((amount: number) => {
		if (transferTo === 'all') {
			domain.transferAsBankerToAll(amount);
		} else {
			domain.transferAsBanker(transferTo.id, amount);
		}
	}, [domain, transferTo]);

	const children: TransferModalProps['children'] = (onClick) => {
		if (transferTo === 'all') {
			return (
				<Button variant="gradient" size="xl" onClick={onClick}>
					All of them
				</Button>
			);
		}

		return (
			<Button color={userColorToMantine(transferTo.color)} size="xl" onClick={onClick}>
				{transferTo.name}
			</Button>
		);
	}

	return (
		<TransferModal presets={domain.presets}
					   title={`Transfer to ${transferTo === 'all' ? 'everyone' : transferTo.name}`}
					   onTransfer={transfer}>
			{children}
		</TransferModal>
	);
}