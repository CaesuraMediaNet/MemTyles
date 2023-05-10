import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { useState } from 'react';

function ClearButton ({ title }) {
	return (
		<button
			className={utilStyles.button}
		>
			{title}
		</button>
	);
}
let home = true;

function Card ({display}) {
	const [showing, setShowing] = useState(false);
	function turnMeOver () {
		setShowing(!showing);
	}

	return (
		<div className={utilStyles.card} onClick={turnMeOver}>
			{display} : {showing ? "Showing" : "Hidden"}
		</div>
	);
}
const cards = [
	"1", "2", "3", "4", "5", "6", "7", "8",
];
const cardTable = cards.map (card => 
	<Card
		display={card}
		key={card}
	/>
);

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
		<ClearButton title="Clear Tyles" />
		  {cardTable}
      </section>
    </Layout>
  );
}
