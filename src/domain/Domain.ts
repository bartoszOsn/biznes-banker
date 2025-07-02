import type { User } from './model/User.ts';
import type { Transaction } from './model/Transaction.ts';
import type { UserColor } from './model/UserColor.ts';

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
	setUserProps: (name: string, color: UserColor) => void;
}

export interface DomainWithoutStarting {
	stage: 'withoutStarting';
	me: User | null;
	opponents: User[];
	joinLink: string;
	startGame: () => void;
}

export interface MainDomain {
	stage: 'main';
	me: User | null;
	opponents: User[];
	balance: number;
	transactions: Transaction[],
	transfer: (toUserId: string, amount: number) => void;
}