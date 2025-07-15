import type { Transaction } from '../../../domain/model/Transaction.ts';
import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import { Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';

export interface MainViewTransactionIconProps {
	transaction: Transaction;
}

export function MainViewTransactionIcon(props: MainViewTransactionIconProps) {
	const domain = useDomainOfType('main');


	if (props.transaction.toUserId === domain.me.id) {
		return (
			<Text c="green" inherit inline component='span'>
				<IconPlus size={12} />
			</Text>
		);
	}

	if (props.transaction.fromUserId === domain.me.id) {
		return (
			<Text c="red" inherit inline component='span'>
				<IconMinus size={12} />
			</Text>
		);
	}

	return null;
}