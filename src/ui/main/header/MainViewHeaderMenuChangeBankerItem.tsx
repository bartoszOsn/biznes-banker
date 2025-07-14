import { IconTrendingUp3 } from '@tabler/icons-react';
import { Button, Grid, Menu, Text } from '@mantine/core';
import { useDomainOfType } from '../../../domain/useDomainOfType.ts';
import { userColorToMantine } from '../../../domain/model/UserColor.ts';
import { useCallback } from 'react';
import type { User } from '../../../domain/model/User.ts';
import { modals } from '@mantine/modals';

export function MainViewHeaderMenuChangeBankerItem() {
	const domain = useDomainOfType('main');

	const transferBankerTo = useCallback((user: User) => {
		if (!domain.asBanker) {
			return;
		}

		domain.asBanker.changeBankerTo(user.id);
		close();
	}, [domain]);

	const openModal = () => {
		const id = modals.open({
			title: 'Change banker',
			children: (
				<>
					<Text>Give banker privileges to:</Text>
					<Grid>
						{
							domain.opponents.map((opponent) => (
								<Grid.Col key={opponent.id} span={6}>
									<Button color={userColorToMantine(opponent.color)} onClick={() => {
										transferBankerTo(opponent);
										modals.close(id);
									}}>
										{opponent.name}
									</Button>
								</Grid.Col>
							))
						}
					</Grid>
				</>
			),
		})
	}

	if (!domain.asBanker) {
		return null;
	}

	return (
		<>
			<Menu.Item leftSection={<IconTrendingUp3 />} onClick={openModal}>Change banker</Menu.Item>
		</>
	)
}