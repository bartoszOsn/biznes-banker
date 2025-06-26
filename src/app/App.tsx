import { useState } from 'react';
import '@mantine/core/styles.css';
import { Button, MantineProvider, Title } from '@mantine/core';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MantineProvider>
		  <Title>Monopoly banker</Title>
		  <Button onClick={() => setCount(count + 1)}>{count}</Button>
	  </MantineProvider>
    </>
  )
}

export default App
