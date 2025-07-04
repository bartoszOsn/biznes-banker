import { CircumstanceRole } from '../../domain/model/CircumstanceRole.ts';
import { Avatar, Button, Group, Text } from '@mantine/core';
import { userColorToMantine } from '../../domain/model/UserColor.ts';
import type { MainDomain } from '../../domain/Domain.ts';
import { useDomainOfType } from '../../domain/useDomainOfType.ts';

export function MainViewHeader() {
	const domain: MainDomain = useDomainOfType('main');

	return (
		<Group w='100%' h='100%' justify='space-between' align='center' px='md'>
			<HeaderUser name={domain.me.name}
						color={userColorToMantine(domain.me.color)}
						isSelected={!domain.isBanker || domain.role === CircumstanceRole.USER}
						onClick={() => domain.isBanker && domain.setRole(CircumstanceRole.USER)}/>
			{
				domain.isBanker && (
					<HeaderUser name='Banker'
								color='gray'
								isSelected={domain.role === CircumstanceRole.BANKER}
								onClick={() => domain.setRole(CircumstanceRole.BANKER)}/>
				)
			}
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