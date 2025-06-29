import { useState } from 'react';
import '@mantine/core/styles.css';
import { Text, MantineProvider, Title } from '@mantine/core';
import { db } from '../infrastructure/firebase/fb.ts';
import { push, ref } from 'firebase/database'
import { DomainProvider } from '../domain/DomainProvider.tsx';
import { useDomain } from '../domain/useDomain.ts';

function App() {
	const [count, setCount] = useState(0);

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

	return <Text>{domain.toString()}</Text>;
}

export default App
