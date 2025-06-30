export interface Transaction {
	fromUserId: 'banker' | string;
	toUserId: 'banker' | string;
	amount: number;
	timestamp: number;
}