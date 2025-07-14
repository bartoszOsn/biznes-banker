import type { Preset } from "./Preset";
import type { Transaction } from "./Transaction";
import type { User } from "./User";

export interface Session {
	id: string;
	createdAt: Date;
	started: boolean;
	users: User[];
	transactions: Transaction[];
	startingMoney: number | null;
	presets: Preset[];
}