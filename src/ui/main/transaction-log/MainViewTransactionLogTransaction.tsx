import type { Transaction } from '../../../domain/model/Transaction.ts';
import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import { Text } from '@mantine/core';
import { useEffect, useState } from 'react';

const NEW_TRANSACTION_TIME_THRESHOLD = 30 * 1000; // 30 seconds;

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

	const time = Intl.DateTimeFormat('pl-PL', {
		timeStyle: 'short'
	}).format(transaction.timestamp);

	const color = useTransactionColor(transaction.timestamp);

	return (
		<Text>
			<Text inline inherit component='span' c={color} style={{ fontWeight: 'bold' }}>[{time}] </Text>
			<Text inline inherit component='span'>{fromUserName} ➜ {toUserName}: ${transaction.amount}</Text>
		</Text>
	);
}

function useTransactionColor(timestamp: number): string {
	const [color, setColor] = useState<string>('var(--mantine-color-gray-6)');

	useEffect(() => {
		const handler = () => {
			const t = Math.max(
				0,
				Math.min(
					1,
					(Date.now() - timestamp) / NEW_TRANSACTION_TIME_THRESHOLD
				)
			);

			const c = `color-mix(in hsl, var(--mantine-color-gray-6) ${t * 100}%, var(--mantine-color-blue-6))`;
			setColor(c);
		}

		const intervalId = setInterval(handler, 1000);
		handler();

		const cleanupTimeout = setTimeout(() => {
			setColor('var(--mantine-color-gray-6)');
			clearInterval(intervalId);
		}, NEW_TRANSACTION_TIME_THRESHOLD);

		return () => {
			clearInterval(intervalId);
			clearTimeout(cleanupTimeout);
		};
	}, [timestamp]);

	return color;
}