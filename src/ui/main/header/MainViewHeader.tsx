import { CircumstanceRole } from '../../../domain/model/CircumstanceRole.ts';
import { Avatar, Button, Group, Text } from '@mantine/core';
import { userColorToMantine } from '../../../domain/model/UserColor.ts';
import type { MainDomain } from '../../../domain/Domain.ts';
import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import { MainViewHeaderMenu } from './MainViewHeaderMenu.tsx';

export function MainViewHeader() {
	const domain: MainDomain = useDomainOfType('main');

	return (
		<Group w='100%' h='100%' justify='space-between' align='center' px='md'>
			<HeaderUser name={domain.me.name}
						color={userColorToMantine(domain.me.color)}
						isSelected={!domain.asBanker || domain.asBanker.role === CircumstanceRole.USER}
						onClick={() => domain.asBanker && domain.asBanker.setRole(CircumstanceRole.USER)}/>
			<Group>
				{
					domain.asBanker && (
						<HeaderUser name='Banker'
									color='gray'
									isSelected={domain.asBanker.role === CircumstanceRole.BANKER}
									onClick={() => domain.asBanker && domain.asBanker.setRole(CircumstanceRole.BANKER)} />
					)
				}
				<MainViewHeaderMenu />
			</Group>
		</Group>
	)
}

function HeaderUser(props: { name: string, color: string, isSelected: boolean, onClick: () => void }) {
	return (
		<Button variant={props.isSelected ? 'light' : 'transparent'}
				color={props.color}
				onClick={props.onClick}
		leftSection={<Avatar color={props.color} size="sm"/>}>
			<Text style={{textTransform: 'uppercase'}}>{props.name}</Text>
		</Button>
	);
}