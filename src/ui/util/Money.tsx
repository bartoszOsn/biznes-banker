import { NumberFormatter } from '@mantine/core';

export function Money({amount} : { amount: number }) {
	return <NumberFormatter prefix='$' thousandSeparator value={amount} />;
}