import { useState } from 'react';
import '@mantine/core/styles.css';
import { Button, MantineProvider, Title } from '@mantine/core';
import { db } from '../infrastructure/firebase/fb.ts';
import { push, ref } from 'firebase/database'

function App() {
  const [count, setCount] = useState(0);

  const addToFirebase = () => {
	  const countsRef = ref(db, 'counts');
	  push(countsRef, count)
	    .then(() => {
	      console.log('Count added to Firebase:', count);
	    })
	    .catch((error) => {
	      console.error('Error adding count to Firebase:', error);
	    });
  }

  return (
    <>
      <MantineProvider>
		  <Title>Monopoly banker</Title>
		  <Button onClick={() => setCount(count + 1)}>{count}</Button>
		  <Button onClick={() => addToFirebase()}>Add to firebase</Button>
	  </MantineProvider>
    </>
  )
}

export default App
