import type { Transaction } from './model/Transaction.ts';

export function useTransactions() {
	return {
		transactions: [] as Transaction[],
		transfer: (toUserId: string, amount: number) => {}
	}
}