import type { User, UserWithBanker, UserWithoutBanker } from './model/User.ts';
import type { Transaction } from './model/Transaction.ts';
import type { UserColor } from './model/UserColor.ts';
import type { CircumstanceRole } from './model/CircumstanceRole.ts';

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
	me: User;
	opponents: User[];
	joinLink: string;
	startGame: () => void;
}

export interface BaseMainDomain {
	stage: 'main';
	opponents: User[];
	balance: number;
	transactions: Transaction[];
	transfer: (toUserId: string, amount: number) => void;
}

export interface MainDomainWithBanker extends BaseMainDomain {
	me: UserWithBanker;
	isBanker: true;
	transferAsBanker: (toUserId: string, amount: number) => void;
	transferAsBankerToAll: (amount: number) => void;
	role: CircumstanceRole;
	setRole: (role: CircumstanceRole) => void;
}

export interface MainDomainWithoutBanker extends BaseMainDomain {
	me: UserWithoutBanker;
	isBanker: false;
}

export type MainDomain = MainDomainWithBanker | MainDomainWithoutBanker;