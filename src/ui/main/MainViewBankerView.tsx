import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import { Avatar, Divider, Image, Stack, Title } from '@mantine/core';
import capitalist from '../../assets/capitalist.svg';
import { MainViewBankerViewTransferButton } from './banker/MainViewBankerViewTransferButton.tsx';

export function MainViewBankerView() {
	const domain = useDomainOfType('main');

	return (
		<Stack w='100%' justify='space-between' align='center' px='md' gap={'xl'}>
			<Avatar size={'xl'}
					radius={'md'}
					variant={'filled'}
					color={'blue'}>
				<Image src={capitalist} alt={'Capitalist Logo'}/>
			</Avatar>
			<Stack gap='md' w='100%'>
				<Title order={2}>Transfer to:</Title>
				<MainViewBankerViewTransferButton transferTo={domain.me} />
				{
					domain.opponents.map(opponent => (
						<MainViewBankerViewTransferButton key={opponent.id} transferTo={opponent} />
					))
				}
				<Divider />
				<MainViewBankerViewTransferButton transferTo={'all'} />
			</Stack>
		</Stack>
	)
}