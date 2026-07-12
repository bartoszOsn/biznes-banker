import { useEffect, useRef } from 'react';

export function useWakeLock() {
	const wakeLockRef = useRef<WakeLockSentinel | null>(null);

	useEffect(() => {
		const isSupported = 'wakeLock' in navigator;

		async function requestWakeLock() {
			try {
				if (isSupported) {
					wakeLockRef.current = await navigator.wakeLock.request('screen');

					// Re-request wake lock on visibility change (e.g., when tab is hidden then shown again)
					document.addEventListener('visibilitychange', handleVisibilityChange);
				} else {
					console.error('Wake lock request failed: Wake lock not supported');
				}
			} catch (err) {
				console.error('Wake lock request failed:', JSON.stringify(err, null, 2));
				if (err instanceof DOMException) {
					console.error(`Message: ${err.message}; Cause: ${err.cause}`);
				}
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