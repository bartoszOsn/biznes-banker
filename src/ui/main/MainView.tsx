import { AppShell, Avatar, ColorSwatch, Group, Stack } from '@mantine/core';
import type { MainDomain } from '../../domain/Domain.ts';
import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import { userColorToMantine } from '../../domain/model/UserColor.ts';

export function MainView() {
	const domain: MainDomain = useDomainOfType('main');

	return (
		<AppShell header={{ height: 60 }} padding="md">
			<AppShell.Header>
				<Group w='100%' h='100%' justify='space-between' align='center' px='md'>
					<Group>
						<ColorSwatch color={userColorToMantine(domain.me.color)} />
						<text style={{ textTransform: 'uppercase'}}>{domain.me.name}</text>
					</Group>
					{
						domain.me.isAlsoBanker && (
							<Group>
								<ColorSwatch color='gray' />
								<text style={{ textTransform: 'uppercase'}}>Banker</text>
							</Group>
						)
					}
				</Group>
			</AppShell.Header>
			<AppShell.Main>
				<Stack w='100%' justify='space-between' align='center' px='md'>
					$15000
				</Stack>
			</AppShell.Main>
			<AppShell.Footer px='md' py='sm'>
				Bartek ➜ Michał: $1000
			</AppShell.Footer>
		</AppShell>
	)
}