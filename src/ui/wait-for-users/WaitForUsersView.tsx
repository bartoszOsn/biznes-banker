import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import { ActionIcon, Box, Button, Card, ColorSwatch, CopyButton, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import dollarGrid from '../../assets/dollar-grid.webp';
import { IconCheck, IconCopy, IconCurrencyDollar } from '@tabler/icons-react';
import type { User } from '../../domain/model/User.ts';
import { userColorToMantine } from '../../domain/model/UserColor.ts';
import { useCallback } from 'react';
import { fireMoneyConfetti } from '../util/fireMoneyConfetti.ts';

export function WaitForUsersView() {
	const domain = useDomainOfType('withoutStarting');

	const onPlay = useCallback(() => {
		fireMoneyConfetti();
		domain.startGame();
	}, [domain.startGame]);

	return (
		<Box style={{
			background: 'linear-gradient(45deg,var(--mantine-color-grape-filled) 0%, var(--mantine-color-violet-filled) 100%)'
		}}>
			<Box style={{
				backgroundImage: `url(${dollarGrid})`,
				backgroundSize: '140px 140px',
				backgroundRepeat: 'repeat'
			}}>
				<Stack w={'100%'}
					   h={'100vh'}
					   px={16}
					   pt={16}
					   gap={32}
					   align={'center'}>
					<Title c="white" style={{textTransform: 'uppercase', textAlign: 'center'}} size={'sm'}>Waiting for other players</Title>
					<Card w={'100%'}>
						<Text size="xs" style={{textAlign: 'center'}}>Share this link with them</Text>
						<TextInput value={domain.joinLink} readOnly rightSection={(
							<CopyButton value={domain.joinLink}>
								{
									({copied, copy}) => (
										<ActionIcon variant="light" color={copied ? 'green' : 'blue'} onClick={copy} title={copied ? 'Copied!' : 'Copy link'}>
											{copied ? <IconCheck/> : <IconCopy/>}
										</ActionIcon>
									)
								}
							</CopyButton>
						)}/>
					</Card>
					<Card>
						<Stack gap={8}>
							{
								domain.me && (
									<UserIndicator user={domain.me} isMe={true} />
								)
							}
							{
								domain.opponents.map((user) => (
									<UserIndicator key={user.id} user={user} isMe={false} />
								))
							}
						</Stack>
					</Card>
					<Button variant={'gradient'} gradient={{from: 'red', to: 'pink', deg: 90}} onClick={onPlay}>Play</Button>
				</Stack>
			</Box>
		</Box>
	)
}

function UserIndicator(props: { user: User, isMe: boolean }) {
	return (
		<Group>
			<ColorSwatch size={props.isMe ? 32 : 28} color={userColorToMantine(props.user.color)}>
				{
					props.user.isAlsoBanker && <IconCurrencyDollar size={18} color={'white'} />
				}
			</ColorSwatch>
			<Text size={props.isMe ? 'xl' : 'md'} style={{fontWeight: props.isMe ? 'bold' : 'normal'}}>{props.user.name}</Text>
		</Group>
	);

}