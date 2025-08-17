import { timestampToDescriptive } from '../../common/timestampToDescriptive.ts';
import { useEffect, useState } from 'react';
import { Text } from '@mantine/core';

const NEW_TRANSACTION_TIME_THRESHOLD = 30 * 1000; // 30 seconds;
const TIME_DESCRIPTION_UPDATE_THRESHOLD = 60 * 1000; // 1 minute

export function MainViewTransactionLogTime({time, targetColor}: { time: number, targetColor?: string }) {
	const timeDescr = useTimestampToDescriptive(time);
	const color = useTransactionColor(time, targetColor);

	return (
		<Text inherit inline component='span' c={color}>
			{timeDescr}
		</Text>
	);
}

function useTransactionColor(timestamp: number, target: string = 'var(--mantine-color-gray-6)'): string {
	const [color, setColor] = useState<string>(target);

	useEffect(() => {
		const handler = () => {
			const t = Math.max(
				0,
				Math.min(
					1,
					(Date.now() - timestamp) / NEW_TRANSACTION_TIME_THRESHOLD
				)
			);

			const c = `color-mix(in hsl, ${target} ${t * 100}%, var(--mantine-color-blue-6))`;
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
	}, [target, timestamp]);

	return color;
}

const useTimestampToDescriptive = (time: number) => {
	const [timestamp, setTimestampToDescriptive] = useState<string>(() => timestampToDescriptive(time));

	useEffect(() => {
		const interval = setInterval(() => {
			setTimestampToDescriptive(timestampToDescriptive(time));
			if (Date.now() - time > TIME_DESCRIPTION_UPDATE_THRESHOLD) {
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [time]);

	return timestamp;
}
