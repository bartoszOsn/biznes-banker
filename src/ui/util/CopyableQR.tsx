import { useClipboard } from '@mantine/hooks';
import QRCode from 'react-qrcode-logo';
import { Box, UnstyledButton, useMantineTheme } from '@mantine/core';
import { IconClipboardCheck, IconClipboardX } from '@tabler/icons-react';

export interface CopyableQRProps {
	value: string;
}

export function CopyableQR({ value }: CopyableQRProps) {
	const clipboard = useClipboard();
	const theme = useMantineTheme();

	const feedbackColor = clipboard.copied
		? theme.colors.green[8]
		: clipboard.error
			? theme.colors.red[8]
			: undefined;

	return (
		<UnstyledButton pos='relative' onClick={() => clipboard.copy(value)}>
			<QRCode
				value={value}
				eyeRadius={1}
				fgColor={feedbackColor }
			/>
			<Box bg='white' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: feedbackColor ? 0.8 : 0, pointerEvents: 'none' }}>
				{ clipboard.copied && <IconClipboardCheck color={feedbackColor} size={64} /> }
				{ clipboard.error && <IconClipboardX color={feedbackColor} size={64} /> }
			</Box>

		</UnstyledButton>
	)
}