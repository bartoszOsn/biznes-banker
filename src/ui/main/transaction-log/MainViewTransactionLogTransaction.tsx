import type { Transaction } from '../../../domain/model/Transaction.ts';
import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import { Text } from '@mantine/core';
import { Money } from '../../util/Money.tsx';

export interface MainViewTransactionLogTransactionProps {
	transaction: Transaction;
}

export function MainViewTransactionLogTransaction({ transaction }: MainViewTransactionLogTransactionProps) {
	const domain = useDomainOfType('main');
	const toUserName = transaction.toUserId === 'banker'
		? 'Banker'
		: (domain.opponents.find(opponent => opponent.id === transaction.toUserId)
			?? domain.me).name;

	const fromUserName = transaction.fromUserId === 'banker'
		? 'Banker'
		: (domain.opponents.find(opponent => opponent.id === transaction.fromUserId)
			?? domain.me).name;
	return (
		<Text>
			<Text inline inherit component='span'>{fromUserName} ➜ {toUserName}: <Money amount={transaction.amount} /></Text>
		</Text>
	);
}