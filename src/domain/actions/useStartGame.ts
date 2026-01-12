import { useCallback } from 'react';
import { useRepository } from '../Repository.ts';
import type { Session } from '../model/Session.ts';
import type { Preset } from '../model/Preset.ts';

export function useStartGame(session: Session) {
	const { pushSessionStarted, pushStartingMoney, pushPresets } = useRepository();

	return useCallback((startingMoney: number, presets: Preset[]) => {
		pushStartingMoney(session.id, startingMoney)
			.then(() => pushPresets(session.id, presets))
			.then(() => pushSessionStarted(session.id, true))
		
	}, [pushPresets, pushSessionStarted, pushStartingMoney, session.id]);
}