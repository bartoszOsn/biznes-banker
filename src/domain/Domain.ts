import type { User, UserWithBanker, UserWithoutBanker } from './model/User.ts';
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
	asBanker: null | {
		startGame: () => void;
		startingMoney: number | null;
		presets: Preset[],
		setStartingMoney: (amount: number | null) => void;
		setPresets: (presets: Preset[]) => void;
	}
}

export interface BaseMainDomain {
	stage: 'main';
	opponents: User[];
	balance: number;
	transactions: Transaction[];
	transfer: (toUserId: string, amount: number) => void;
	transferToBanker: (amount: number) => void;
	transferToAllButMe: (amount: number) => void;
	presets: Preset[];
}

export interface MainDomainWithBanker extends BaseMainDomain {
	me: UserWithBanker;
	isBanker: true;
	transferAsBanker: (toUserId: string, amount: number) => void;
	transferAsBankerToAll: (amount: number) => void;
	changeBankerTo: (userId: string) => void;
	role: CircumstanceRole;
	setRole: (role: CircumstanceRole) => void;
}

export interface MainDomainWithoutBanker extends BaseMainDomain {
	me: UserWithoutBanker;
	isBanker: false;
}

export type MainDomain = MainDomainWithBanker | MainDomainWithoutBanker;