import { useState } from 'react';

export function useShake() {
	const [shake, setShake] = useState(false);

	const triggerShake = () => {
		setShake(true);
		setTimeout(() => setShake(false), 300); // Reset shake after 500ms
	}

	return [shake, triggerShake] as const;
}