import moneySrc from '../../assets/money.mp3';
import { notifications } from '@mantine/notifications';
import { Button, Stack, Text } from '@mantine/core';

const audio = new Audio(moneySrc);
let notificationId: string | null = null;

export function useMoneySound(): () => Promise<void> {
	return async () => {
		try {
			audio.currentTime = 0;
			await audio.play();
		} catch {
			if (notificationId) {
				notifications.hide(notificationId);
			}

			notificationId = notifications.show({
				autoClose: false,
				withCloseButton: false,
				title: 'Automatic screen lock prevention failed.',
				message: <>
					<Stack>
						<Text inherit>User interaction required to play notification sound.</Text>
						<Button variant='light' size='compact-sm' style={{alignSelf: 'end'}} onClick={async () => {
							if (notificationId) {
								notifications.hide(notificationId);
							}
							try {
								audio.currentTime = 0;
								void audio.play();
							} catch {
								notificationId = notifications.show({
									title: 'Cannot play notification sound',
									message: 'Notification sound playback is not supported by this browser.',
									color: 'red'
								})
							}
						}}>
							Manually enable notifications
						</Button>
					</Stack>
				</>
			});
		}
	};
}