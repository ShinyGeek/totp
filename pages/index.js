import Head from 'next/head'
import { Link } from 'next';
import styles from '../styles/Home.module.css'
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import secure from '../shared/secure';
import { useState } from 'react';

const { getToken } = secure;

export default function Home() {

  const [result, setResult] = useState(null);
  const [key, setKey] = useState('');

  const sendToken = async () => {
    var token = key; //getToken();
    console.log(`Token: ${token}`);

    const response = await fetch(`http://localhost:3000/api/test`,
      { headers: { "totp-token": `${token}` } }
    )
    const tex = await response.text();

    setResult(tex);
  }

  const clearResult = () => {
    setResult(null);
  }

  const textChanged = (value) => {
    setKey(value);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <Button onClick={sendToken} onMouseDown={clearResult}>Click Me</Button>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">2FA Code</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as="input"
            value={key}
            onChange={(e) => {textChanged(e.target.value)}}
          />
        </InputGroup>
        <div>{result}</div>

      </main>


    </div>
  )
}
