import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'MemTyles';
export const siteTitle = 'Memory Game';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="A memory game turning over two tiles and win when they match."
        />
        <meta
          property="og:image"
          content="/img/back.png"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>
	  	Copyright &copy; Caesura Media Limited, 2023
	  </footer>
    </div>
  );
}
