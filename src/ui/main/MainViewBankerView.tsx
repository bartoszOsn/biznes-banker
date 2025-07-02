import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import { Avatar, Button, Divider, Image, Stack, Text, Title } from '@mantine/core';
import capitalist from '../../assets/capitalist.svg';
import { userColorToMantine } from '../../domain/model/UserColor.ts';

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
				<Button color={userColorToMantine(domain.me.color)} size='xl'>
					{domain.me.name}
				</Button>
				{
					domain.opponents.map(opponent => (
						<Button key={opponent.id} color={userColorToMantine(opponent.color)} size='xl'>
							{opponent.name}
						</Button>
					))
				}
				<Divider />
				<Button color='gray' size='xl'>
					All of them
				</Button>
			</Stack>
		</Stack>
	)
}