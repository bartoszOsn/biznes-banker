import { createContext, type ReactNode, useCallback, useContext, useRef, useState } from 'react';
import moneySrc from '../../assets/money.mp3';
import { ActionIcon, Affix } from '@mantine/core';
import { IconVolumeOff } from '@tabler/icons-react';

export interface SoundPlayerProvider {
	playMoneySound: () => void;
	muted: boolean;
	unmute: () => Promise<void>;
}

const SoundPlayerContext = createContext<SoundPlayerProvider>({ playMoneySound: () => {}, muted: true, unmute: () => Promise.resolve()})

export function SoundPlayerProvider({ children }: { children: ReactNode}): ReactNode {
	const [muted, setMuted] = useState(true);

	const audioContextRef = useRef<AudioContext | null>(null);
	const moneyBufferRef = useRef<AudioBuffer | null>(null);

	const unmute = useCallback(async () => {
		audioContextRef.current = new AudioContext();
		const response = await fetch(moneySrc);
		const arrayBuffer = await response.arrayBuffer();
		moneyBufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer);
		setMuted(false);
	}, []);

	const playMoneySound = useCallback(() => {
		if (!audioContextRef.current || !moneyBufferRef.current) return;
		const source = audioContextRef.current.createBufferSource();
		source.buffer = moneyBufferRef.current;
		source.connect(audioContextRef.current.destination);
		source.start(0);
	}, []);

	const player: SoundPlayerProvider = {
		muted: muted,
		unmute,
		playMoneySound
	};

	return (
		<SoundPlayerContext.Provider value={player}>
			{children}
			{
				muted && (
					<Affix position={{ bottom: 20, right: 20 }}>
						<ActionIcon color='gray' variant='light' onClick={unmute} size='xl' radius='xl'>
							<IconVolumeOff />
						</ActionIcon>
					</Affix>
				)
			}
		</SoundPlayerContext.Provider>
	);
}

export function useSoundPlayer() {
	return useContext(SoundPlayerContext);
}
