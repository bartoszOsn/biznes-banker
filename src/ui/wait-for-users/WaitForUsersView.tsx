import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import { ActionIcon, Button, Card, ColorSwatch, Stack, Table, Text, Title } from '@mantine/core';
import { IconBuildingBank, IconX } from '@tabler/icons-react';
import type { User } from '../../domain/model/User.ts';
import { userColorToMantineVar } from '../../domain/model/UserColor.ts';
import { type ReactNode, useCallback } from 'react';
import { SelectMoneyPresetsButton } from './SelectMoneyPresetsButton.tsx';
import { ChangeUsernameAndColorButton } from './ChangeUsernameAndColorButton.tsx';
import { CopyableQR } from '../util/CopyableQR.tsx';

export function WaitForUsersView() {
	const domain = useDomainOfType('withoutStarting');

	const onPlay = useCallback(() => {
		if (domain.asBanker) {
			domain.asBanker.startGame();
		}
	}, [domain.asBanker]);

	return (
		<Stack w={'100%'}
			   mih={'100vh'}
			   px={16}
			   pt={64}
			   pb={32}
			   gap={32}
			   bg="gray.0"
			   align={'center'}>
			<Title style={{textAlign: 'center'}}>Waiting for other players</Title>
			<Card w={'100%'} withBorder>
				<Title order={2} ta="center" mb="md">Let others scan to join</Title>
				<Stack align="center">
					<CopyableQR value={domain.joinLink}/>
				</Stack>
				<Text size="xs" style={{textAlign: 'center'}}>Or tap QR code to copy link</Text>
			</Card>
			<Card w="100%" withBorder>
				<Title order={4} ta="center" mb="md">Already joined</Title>
				<Table withRowBorders={false}>
					<Table.Tbody>
						{
							domain.me && (
								<UserRow user={domain.me} isMe={true}>
									<ChangeUsernameAndColorButton/>
								</UserRow>
							)
						}
						{
							domain.opponents.map((user) => (
								<UserRow key={user.id} user={user} isMe={false}>
									{
										domain.asBanker && (
											<ActionIcon variant="subtle" color="red" title="Kick user" style={{alignSelf: 'end'}}
														onClick={() => domain.asBanker?.kickUser(user)}>
												<IconX size={18}/>
											</ActionIcon>
										)
									}
								</UserRow>
							))
						}
					</Table.Tbody>
				</Table>
			</Card>
			{
				domain.asBanker && (
					<Button.Group w='100%'>
						<Button fullWidth size="lg" onClick={onPlay}>Play</Button>
						<SelectMoneyPresetsButton/>
					</Button.Group>
				)
			}
		</Stack>
	)
}

function UserRow(props: { user: User, isMe: boolean, children?: ReactNode }) {
	return (
		<Table.Tr>
			<Table.Td w='0px'>
				<ColorSwatch size={8} color={userColorToMantineVar(props.user.color)}/>
			</Table.Td>
			<Table.Td w='0px'>
				{
					props.user.isAlsoBanker && <IconBuildingBank/>
				}
			</Table.Td>
			<Table.Td>
				<Text size={'md'} style={{fontWeight: props.isMe ? 'bold' : 'normal', textOverflow: 'ellipsis', textWrap: 'nowrap'}}>{props.user.name}</Text>
			</Table.Td>
			<Table.Td w='0px'>
				{props.children}
			</Table.Td>
		</Table.Tr>
	);
}