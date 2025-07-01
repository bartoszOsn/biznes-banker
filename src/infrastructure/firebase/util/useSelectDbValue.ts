import type { DbRef } from './DbRef.ts';
import { onValue} from 'firebase/database';
import { useEffect, useState } from 'react';

export function useSelectDbValue<T>(ref: DbRef<T>): T | null {
	const [value, setValue] = useState<T | null>(null);

	useEffect(() => {
		const unsubscribe = onValue(ref, (snapshot) => {
			const data = snapshot.val();
			setValue(data as T | null);
		});

		return unsubscribe;
	}, []); // TODO: Add ref as a dependency if necessary

	return value;
}