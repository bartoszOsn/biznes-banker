import { map, type Observable } from 'rxjs';
import type { Preset } from '../../domain/model/Preset.ts';
import { selectDbValue } from './util/selectDbValue.ts';
import { getRef } from './util/getRef.ts';
import { db } from './fb.ts';

export function selectPresets(sessionId: string): Observable<Preset[]> {
	return selectDbValue(getRef(db, sessionId, 'startingMoney'))
		.pipe(
			map(presetsObj => {
				if (!presetsObj) {
					return [];
				}

				return Object.values(presetsObj).map(preset => ({
					name: preset.name,
					amount: preset.amount,
				}))
			})
		);
}