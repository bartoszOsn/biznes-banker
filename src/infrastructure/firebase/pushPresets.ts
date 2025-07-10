import { set } from 'firebase/database';
import { db } from './fb.ts';
import { getRef } from './util/getRef.ts';
import type { Preset } from '../../domain/model/Preset.ts';

export async function pushPresets(sessionId: string, presets: Preset[]): Promise<void> {
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
}