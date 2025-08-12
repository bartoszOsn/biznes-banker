import { createContext, useContext } from "react";
import type { UserColor } from './model/UserColor.ts';
import type { Preset } from './model/Preset.ts';
import type { Session } from './model/Session.ts';

export interface Repository {
	userId: string;

	pushBankerId(sessionId: string, bankerId: string): Promise<void>;
	pushNewSession(): Promise<string>;
	pushNewUser(sessionId: string, name: string, color: UserColor, isBanker?: boolean): Promise<string>;
	pushPresets(sessionId: string, presets: Preset[]): Promise<void>;
	pushSessionStarted(sessionId: string, started: boolean): Promise<void>;
	pushStartingMoney(sessionId: string, startingMoney: number | null): Promise<void>;
	pushTransaction(sessionId: string,
					userId: 'banker' | string,
					toUserId: 'banker' | string,
					amount: number,
					description?: string): Promise<void>;
	selectUserCountOnce(sessionId: string): Promise<number>;
	useSelectSession(sessionId: string | null): Session | null;
	removeUserFromSession(sessionId: string, userId: string): Promise<void>;
}

export const RepositoryContext = createContext<Repository | null>(null);

export function useRepository(): Repository {
	const repository = useContext(RepositoryContext);
	if (repository === null) {
		throw new Error('useRepository must be used within a RepositoryProvider');
	}
	return repository;
}