import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { Averia_Sans_Libre } from 'next/font/google';
const memTylesFont =Averia_Sans_Libre({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const name = 'MemTyles';
export const siteTitle = 'MemTyles : A Tyle Memory Game';

export default function Layout({ children, home }) {
  return (
    <div className={[styles.container, memTylesFont.className].join (' ')}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="A memory game turning over two Tyles and win when they match."
        />
        <meta
          property="og:image"
          content="/img/back.png"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
		<meta name="viewport" content="initial-scale=1, width=device-width" />
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
