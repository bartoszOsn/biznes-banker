import { useEffect, useRef } from 'react';

export function useWakeLock() {
	const wakeLockRef = useRef<WakeLockSentinel | null>(null);

	useEffect(() => {
		const isSupported = 'wakeLock' in navigator;

		async function requestWakeLock() {
			try {
				if (isSupported) {
					wakeLockRef.current = await (navigator as any).wakeLock.request('screen');

					// Re-request wake lock on visibility change (e.g., when tab is hidden then shown again)
					document.addEventListener('visibilitychange', handleVisibilityChange);
				}
			} catch (err) {
				console.error('Wake lock request failed:', err);
			}
		}

		function handleVisibilityChange() {
			if (document.visibilityState === 'visible') {
				requestWakeLock();
			}
		}

		requestWakeLock();

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			if (wakeLockRef.current) {
				wakeLockRef.current.release().catch((err) => {
					console.error('Wake lock release failed:', err);
				});
				wakeLockRef.current = null;
			}
		};
	}, []);
}