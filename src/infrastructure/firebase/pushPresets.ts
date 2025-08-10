import { type Database, set } from 'firebase/database';
import { getRef } from './util/getRef.ts';
import type { Preset } from '../../domain/model/Preset.ts';

export const pushPresets = (db: Database) => async (sessionId: string, presets: Preset[]): Promise<void> => {
	const presetsRef = getRef(db,sessionId, 'presets');
	const presetsDTO = Object.fromEntries(
		presets.map((preset, index) => [
			index.toString(),
			{
				name: preset.name,
				amount: preset.amount,
			}
		])
	);

	await set(presetsRef, presetsDTO);
};