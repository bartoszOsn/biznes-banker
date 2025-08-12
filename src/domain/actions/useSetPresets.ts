import { useCallback } from 'react';
import type { Preset } from '../model/Preset.ts';
import { useRepository } from '../Repository.ts';
import type { Session } from '../model/Session.ts';

export function useSetPresets(session: Session) {
	const { pushPresets } = useRepository();

	return useCallback((presets: Preset[]) => {
		pushPresets(session.id, presets).then();
	}, [pushPresets, session.id]);
}