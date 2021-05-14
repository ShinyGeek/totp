import Head from 'next/head'
import { Link } from 'next';
import styles from '../styles/Home.module.css'
import { Button } from 'react-bootstrap';
import secure from '../shared/secure';
import { useState } from 'react';

const { getToken } = secure;

export default function Home() {

  const [result, setResult] = useState(null);

  const sendToken = async () => {
    var token = getToken();
    console.log(`Token: ${token}`);

    const response = await fetch(`http://localhost:3000/api/test`,
      { headers: { "totp-token": `${token}` } }
    )
    const tex = await response.text();

    setResult(tex);
  }

  const clearResult = () => {
    setResult(null)    ;
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
        <div>{result}</div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
