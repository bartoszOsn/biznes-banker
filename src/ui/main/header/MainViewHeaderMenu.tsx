import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import type { ReactNode } from 'react';
import { ActionIcon, Menu } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons-react';
import { MainViewHeaderMenuChangeBankerItem } from './MainViewHeaderMenuChangeBankerItem.tsx';

export function MainViewHeaderMenu() {
	const domain = useDomainOfType('main');

	const items: ReactNode[] = [];

	if (domain.asBanker) {
		items.push(<Menu.Label>Banker</Menu.Label>);
		items.push(
			<MainViewHeaderMenuChangeBankerItem />
		)
	}


	if (items.length === 0) {
		return null;
	}

	return (
		<Menu shadow='md'>
			<Menu.Target>
				<ActionIcon variant='subtle' color='gray'>
					<IconMenu2 />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				{ items }
			</Menu.Dropdown>
		</Menu>
	)
}