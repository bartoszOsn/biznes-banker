import '@mantine/core/styles.css';
import { MantineProvider, Text, Title } from '@mantine/core';
import { DomainProvider } from '../domain/DomainProvider.tsx';
import { useDomain } from '../domain/useDomain.ts';
import { UserColor } from '../domain/model/UserColor.ts';

function App() {
	return (
		<>
			<MantineProvider>
				<DomainProvider>
					<Title>Monopoly banker</Title>
					<Test/>
				</DomainProvider>
			</MantineProvider>
		</>
	)
}

export function Test() {
	const domain = useDomain();

	if (domain.stage === 'withoutSession') {
		return (
			<>
				{domain.stage}
				<button onClick={domain.startSession}>Start session</button>
			</>
		)
	}

	if (domain.stage === 'withoutUser') {
		return (
			<>
				{domain.stage}
				<button onClick={() => domain.setUserProps('admin', UserColor.GREEN)}>Set user props</button>
			</>
		)
	}

	return (
		<Text>
			{domain.stage}
		</Text>
	)
}

export default App
