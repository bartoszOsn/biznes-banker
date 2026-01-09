import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import { UserColor, userColorToMantine } from '../../domain/model/UserColor.ts';
import { Avatar, Box, Button, Image, Stack, Text, TextInput, Title } from '@mantine/core';
import capitalist from '../../assets/capitalist.svg';
import { useCallback, useEffect, useState } from 'react';
import { UserColorPicker } from '../common/UserColorPicker.tsx';
import { useShake } from '../../util/useShake.ts';

export function LoginView() {
	const domain = useDomainOfType('withoutUser');
	const placeholder = useFunnyName();
	const [name, setName] = useState<string>('');
	const [color, setColor] = useState<UserColor | null>(null);
	const [shakeName, triggerShakeName] = useShake();
	const [shakeColor, triggerShakeColor] = useShake();

	const onNext = useCallback(() => {
		if (!name) {
			triggerShakeName();
		}

		if (!color) {
			triggerShakeColor();
		}

		if (!name || !color) {
			return;
		}

		domain.setUserProps(name, color);
	}, [name, color, domain, triggerShakeName, triggerShakeColor]);

	return (
		<Stack w={'100%'}
			   mih={'100vh'}
			   px={16}
			   pt={48}
			   gap={24}
			   align={'center'}>
			<Avatar size={'xl'}
					radius={'md'}
					variant={'filled'}
					color={color ? userColorToMantine(color) : 'gray'}>
				<Image src={capitalist} alt={'Capitalist Logo'}/>
			</Avatar>
			<Box ta="center">
				<Title>Welcome!</Title>
				<Text c="dimmed">Let other players recognize you!</Text>
			</Box>
			<Stack w={'100%'}
				   gap={16}
				   align={'center'}>
				<Stack gap={10} w="100%">
					<Text fw="bold" style={{
						animationName: shakeName ? 'shake' : undefined,
						animationDuration: '300ms'
					}}>
						Choose your name
					</Text>
					<TextInput w="100%" placeholder={placeholder} value={name} onChange={(e) => setName(e.target.value)}/>
				</Stack>
				<Stack gap={10} w="100%" align="center">
					<Text fw="bold" style={{
						alignSelf: 'start',
						animationName: shakeColor ? 'shake' : undefined,
						animationDuration: '300ms'
					}}>
						Select a color
					</Text>
					<UserColorPicker value={color ?? undefined} onChange={setColor}/>
				</Stack>
				<Button fullWidth mt="sm" data-disabled={!name || !color} onClick={onNext}>Continue</Button>
			</Stack>

		</Stack>
	);
}

function useFunnyName() {
	const [name, setNameInt] = useState<string>('');

	useEffect(() => {
		const running = {current: true};

		function setName(newName: string) {
			if (!running.current) {
				return;
			}
			setNameInt(newName);
		}

		const names = [
			'Sułtan',
			'Księciuno',
			'Kapytalista',
			'Kapitano',
			'Chachmęt',
			'Pan Prezes',
			'SzefaSyn'
		];

		(async () => {
			while (running.current) {
				names.sort(() => Math.random() - 0.5);

				for (const newName of names) {
					for (let i = 0; i <= newName.length; i++) {
						setName(newName.slice(0, i));
						await new Promise(res => setTimeout(res, 100));
					}

					await new Promise(res => setTimeout(res, 3000));

					for (let i = newName.length - 1; i >= 0; i--) {
						setName(newName.slice(0, i));
						await new Promise(res => setTimeout(res, 100));
					}
					if (!running.current) {
						return;
					}
				}

			}
		})();

		return () => {
			running.current = false;
		};
	}, []);

	return name;
}