import { MainViewView } from './MainViewView.ts';
import { Avatar, Button, Group } from '@mantine/core';
import { userColorToMantine } from '../../domain/model/UserColor.ts';
import type { MainDomain } from '../../domain/Domain.ts';
import { useDomainOfType } from '../../domain/useDomainOfType.ts';

export interface MainViewHeaderProps {
	view: MainViewView;
	onViewChange: (view: MainViewView) => void;
}

export function MainViewHeader(props: MainViewHeaderProps) {
	const domain: MainDomain = useDomainOfType('main');

	return (
		<Group w='100%' h='100%' justify='space-between' align='center' px='md'>
			<HeaderUser name={domain.me.name}
						color={userColorToMantine(domain.me.color)}
						isSelected={props.view === MainViewView.USER}
						onClick={() => props.onViewChange(MainViewView.USER)}/>
			{
				domain.me.isAlsoBanker && (
					<HeaderUser name='Banker'
								color='gray'
								isSelected={props.view === MainViewView.BANKER}
								onClick={() => props.onViewChange(MainViewView.BANKER)}/>
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
			<text style={{textTransform: 'uppercase'}}>{props.name}</text>
		</Button>
	);
}