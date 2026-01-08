import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import { ActionIcon, Box, Button, Card, ColorSwatch, CopyButton, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import dollarGrid from '../../assets/dollar-grid.webp';
import { IconCheck, IconCopy, IconCurrencyDollar, IconX } from '@tabler/icons-react';
import type { User } from '../../domain/model/User.ts';
import { userColorToMantineVar } from '../../domain/model/UserColor.ts';
import { type ReactNode, useCallback } from 'react';
import { SelectMoneyPresetsButton } from './SelectMoneyPresetsButton.tsx';
import { ChangeUsernameAndColorButton } from './ChangeUsernameAndColorButton.tsx';

export function WaitForUsersView() {
	const domain = useDomainOfType('withoutStarting');

	const onPlay = useCallback(() => {
		if (domain.asBanker) {
			domain.asBanker.startGame();
		}
	}, [domain.asBanker]);

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
					<Card w='100%'>
						<Stack gap={8} w='100%' align='center'>
							{
								domain.me && (
									<UserIndicator user={domain.me}
												   isMe={true}>
										<ChangeUsernameAndColorButton />
									</UserIndicator>
								)
							}
							{
								domain.opponents.map((user) => (
									<UserIndicator key={user.id}
												   user={user}
												   isMe={false}>
										{
											domain.asBanker && (
												<ActionIcon variant="subtle" color="red" title="Kick user" style={{ alignSelf: 'end' }} onClick={() => domain.asBanker?.kickUser(user)}>
													<IconX size={18} />
												</ActionIcon>
											)
										}
									</UserIndicator>
								))
							}
						</Stack>
					</Card>
					{
						domain.asBanker && (
							<Stack gap='xs' align='center'>
								<Button variant={'gradient'} gradient={{from: 'red', to: 'pink', deg: 90}} onClick={onPlay}>Play</Button>
								<SelectMoneyPresetsButton />
							</Stack>
						)
					}
				</Stack>
			</Box>
		</Box>
	)
}

function UserIndicator(props: { user: User, isMe: boolean, children?: ReactNode }) {
	return (
		<Group>
			<ColorSwatch size={props.isMe ? 32 : 28} color={userColorToMantineVar(props.user.color)}>
				{
					props.user.isAlsoBanker && <IconCurrencyDollar size={18} color={'white'} />
				}
			</ColorSwatch>
			<Text size={props.isMe ? 'xl' : 'md'} style={{fontWeight: props.isMe ? 'bold' : 'normal'}}>{props.user.name}</Text>
			{ props.children }
		</Group>
	);

}