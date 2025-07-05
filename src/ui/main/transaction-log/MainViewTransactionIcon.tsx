import type { Transaction } from '../../../domain/model/Transaction.ts';
import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import { ThemeIcon } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';

export interface MainViewTransactionIconProps {
	transaction: Transaction;
}

export function MainViewTransactionIcon(props: MainViewTransactionIconProps) {
	const domain = useDomainOfType('main');


	if (props.transaction.toUserId === domain.me.id) {
		return (
			<ThemeIcon color="green" size={24} radius="xl">
				<IconPlus size={16} />
			</ThemeIcon>
		);
	}

	if (props.transaction.fromUserId === domain.me.id) {
		return (
			<ThemeIcon color="red" size={24} radius="xl">
				<IconMinus size={16} />
			</ThemeIcon>
		);
	}

	return (
		<ThemeIcon color="gray" size={24} radius="xl">
		</ThemeIcon>
	);
}