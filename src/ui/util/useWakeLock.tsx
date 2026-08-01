import { useEffect, useRef } from 'react';
import { notifications } from '@mantine/notifications';
import { Button, Stack, Text } from '@mantine/core';
import { IconDeviceMobile } from '@tabler/icons-react';

export function useWakeLock() {
	const wakeLockRef = useRef<WakeLockSentinel | null>(null);
	const notificationIdRef = useRef<string | null>(null);

	useEffect(() => {
		const isSupported = 'wakeLock' in navigator;

		async function requestWakeLock() {
			try {
				if (isSupported) {
					wakeLockRef.current = await navigator.wakeLock.request('screen');
				} else {
					console.error('Wake lock request failed: Wake lock not supported');
				}
			} catch (err) {
				console.error('Wake lock request failed:', JSON.stringify(err, null, 2));
				if (err instanceof DOMException) {
					if (notificationIdRef.current) {
						notifications.hide(notificationIdRef.current);
					}
					notificationIdRef.current = notifications.show({
						autoClose: false,
						withCloseButton: false,
						icon: <IconDeviceMobile />,
						title: 'Automatic screen lock prevention failed.',
						message: <>
							<Stack>
								<Text inherit>User interaction required to prevent screen lock.</Text>
								<Button variant='light' size='compact-sm' style={{ alignSelf: 'end' }} onClick={async () => {
									if (notificationIdRef.current) {
										notifications.hide(notificationIdRef.current);
									}
									try {
										if (isSupported) {
											wakeLockRef.current = await navigator.wakeLock.request('screen');
										} else {
											console.error('Wake lock request failed: Wake lock not supported');
										}
									} catch {
										notificationIdRef.current = notifications.show({
											title: 'Cannot prevent screen lock',
											icon: <IconDeviceMobile />,
											message: 'Screen lock prevention is not supported by this browser.',
											color: 'red'
										})
									}
								}}>
									Manually prevent screen lock
								</Button>
							</Stack>
						</>
					})
				}
			}
		}

		function handleVisibilityChange() {
			if (document.visibilityState === 'visible') {
				requestWakeLock();
			}
		}

		requestWakeLock().then();
		// Re-request wake lock on visibility change (e.g., when tab is hidden then shown again)
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			if (wakeLockRef.current) {
				wakeLockRef.current.release().catch((err) => {
					console.error('Wake lock release failed:', err);
				});
				wakeLockRef.current = null;
			}
			if (notificationIdRef.current) {
				notifications.hide(notificationIdRef.current);
				notificationIdRef.current = null;
			}
		};
	}, []);
}