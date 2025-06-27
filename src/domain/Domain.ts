import type { User } from './model/User.ts';
import type { Transaction } from './model/Transaction.ts';

export type Domain = DomainWithoutSession
	| DomainWithoutUser
	| DomainWithoutStarting
	| MainDomain;

export interface DomainWithoutSession {
	stage: 'withoutSession';
	startSession: () => void;
}

export interface DomainWithoutUser {
	stage: 'withoutUser';
	setUserProps: (props: Omit<User, 'id' | 'isAlsoBanker'>) => void;
}

export interface DomainWithoutStarting {
	stage: 'withoutStarting';
	me: User;
	opponents: User[];
	joinLink: string;
	startGame: () => void;
}

export interface MainDomain {
	stage: 'main';
	me: User;
	opponents: User[];
	balance: number;
	transactions: Transaction[],
	transfer: (toUserId: string, amount: number) => void;
}