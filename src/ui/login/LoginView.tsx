import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import { UserColor } from '../../domain/model/UserColor.ts';
import { Avatar, Box, Button, Image, Stack, Text, TextInput } from '@mantine/core';
import dollarGrid from '../../assets/dollar-grid.webp';
import capitalist from '../../assets/capitalist.svg';
import { useCallback, useMemo, useState } from 'react';
import { UserColorPicker } from '../common/UserColorPicker.tsx';
import { fireMoneyConfetti } from '../util/fireMoneyConfetti.ts';
import { useShake } from '../../util/useShake.ts';

export function LoginView() {
	const domain = useDomainOfType('withoutUser');
	const placeholder = useMemo(randomFunnyName, [])
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

		fireMoneyConfetti();
		domain.setUserProps(name, color);
	}, [name, color, domain.setUserProps]);

	return (
		<Box style={{
			background: 'linear-gradient(45deg,var(--mantine-color-green-filled) 0%, var(--mantine-color-lime-filled) 100%)'
		}}>
			<Box style={{
				backgroundImage: `url(${dollarGrid})`,
				backgroundSize: '140px 140px',
				backgroundRepeat: 'repeat'
			}}>
				<Stack w={'100%'}
					   h={'100vh'}
					   px={16}
					   pt={48}
					   gap={32}
					   align={'center'}>
					<Avatar size={'xl'}
							radius={'md'}
							variant={'filled'}
							color={'blue'}>
						<Image src={capitalist} alt={'Capitalist Logo'}/>
					</Avatar>
					<Stack gap={10} align={'center'}>
						<Text c="white"
							  style={{
								  textAlign: 'center',
								  textTransform: 'uppercase',
								  animationName: shakeName ? 'shake' : undefined,
								  animationDuration: '300ms'
							  }}>
							Choose your name
						</Text>
						<TextInput placeholder={placeholder} value={name} onChange={(e) => setName(e.target.value)}/>
					</Stack>
					<Stack gap={10} align={'center'}>
						<Text c="white"
							  style={{
								  textAlign: 'center',
								  textTransform: 'uppercase',
								  animationName: shakeColor ? 'shake' : undefined,
								  animationDuration: '300ms'
							  }}>
							Select a color
						</Text>
						<UserColorPicker value={color ?? undefined} onChange={setColor}/>
					</Stack>
					<Button variant={'gradient'} gradient={{from: 'blue', to: 'teal', deg: 90}} onClick={onNext}>Next</Button>
				</Stack>
			</Box>
		</Box>
	);
}

function randomFunnyName() {
	const names = [
		'Sułtan',
		'Księciuno',
		'Kapytalista',
		'Kapitano',
		'Chachmęt'
	];

	return names[Math.floor(Math.random() * names.length)];
}