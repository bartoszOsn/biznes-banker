import type { User } from './model/User.ts';
import type { Transaction } from './model/Transaction.ts';
import type { UserColor } from './model/UserColor.ts';
import type { CircumstanceRole } from './model/CircumstanceRole.ts';
import type { Preset } from './model/Preset.ts';

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
	changeUsernameAndColor: (name: string, color: UserColor) => void;
	asBanker: null | {
		startGame: (startingMoney: number, presets: Preset[]) => void;
		kickUser: (user: User) => void;
	}
}

export interface MainDomain {
	stage: 'main';
	me: User;
	opponents: User[];
	balance: number;
	transactions: Transaction[];
	transfer: (toUserId: string, amount: number, description?: string) => void;
	transferToBanker: (amount: number, description?: string) => void;
	transferToAllButMe: (amount: number, description?: string) => void;
	presets: Preset[];
	asBanker?: null | {
		transferAsBanker: (toUserId: string, amount: number, description?: string) => void;
		transferAsBankerToAll: (amount: number, description?: string) => void;
		changeBankerTo: (userId: string) => void;
		role: CircumstanceRole;
		setRole: (role: CircumstanceRole) => void;
	}
}
