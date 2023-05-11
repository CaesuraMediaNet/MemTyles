import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { useState } from 'react';

// Layout
// Default export : 
// Game
//   Title
//   Clear
//   ClothTable
//   Results
//
// Card
// ClothTable
//      State of all the Cards
// Clear
// Pass functions as props

const initBoard = [
	{id : 0,  imgSrc : "/img/card0.png", flipped : false},
	{id : 1,  imgSrc : "/img/card1.png", flipped : false},
	{id : 2,  imgSrc : "/img/card2.png", flipped : false},
	{id : 3,  imgSrc : "/img/card3.png", flipped : false},
	{id : 4,  imgSrc : "/img/card4.png", flipped : false},
	{id : 5,  imgSrc : "/img/card5.png", flipped : false},
	{id : 6,  imgSrc : "/img/card6.png", flipped : false},
	{id : 7,  imgSrc : "/img/card7.png", flipped : false},
	{id : 8,  imgSrc : "/img/card8.png", flipped : false},
	{id : 9,  imgSrc : "/img/card0.png", flipped : false},
	{id : 10, imgSrc : "/img/card1.png", flipped : false},
	{id : 11, imgSrc : "/img/card2.png", flipped : false},
	{id : 12, imgSrc : "/img/card3.png", flipped : false},
	{id : 13, imgSrc : "/img/card4.png", flipped : false},
	{id : 14, imgSrc : "/img/card5.png", flipped : false},
	{id : 15, imgSrc : "/img/card6.png", flipped : false},
	{id : 16, imgSrc : "/img/card7.png", flipped : false},
	{id : 17, imgSrc : "/img/card8.png", flipped : false},
];

function Card ({id, imgSrc, width, height, clicked, flipped}) {
	return (
		<div onClick={clicked} className={utilStyles.card}>
			<p>{id}</p>
			<img src={imgSrc} width={width} height={height} />
			{flipped ? <p>Flipped</p> : <p>Not Flipped</p>}
		</div>
	);
}

function flipCard (board, card) {
	let newBoard   = JSON.parse(JSON.stringify(board));
	let numFlipped = 0;
	let notPoss    = false;
	let matches    = null;
	let won        = false;
	newBoard.forEach (thisCard => {
		if (thisCard.flipped) {
			numFlipped++;
		}
		if (numFlipped > 1) {
			notPoss = true;
		}
	});
	if (!notPoss) {
		newBoard[card.id] = {id : card.id, imgSrc : card.imgSrc, flipped : !newBoard[card.id].flipped};
		newBoard.forEach (thisCard => {
			if (thisCard.flipped) {
				if (matches && matches === thisCard.imgSrc) {
					won = true;
					console.log ("You won!");
				} else {
					matches = thisCard.imgSrc;
				}
			}
		});
	}
	return {board : newBoard, won : won};
}


export default function Game () {
	const [board, setBoard]     = useState (initBoard);
	const [wonPlay, setWonPlay] = useState (false);
	function ClearButton () {
		return (
			<button
				className={utilStyles.button}
				onClick={() => setBoard(initBoard)}
			>
				Clear Board
			</button>
		);
	}
	function handleClick (card) {
		let play = flipCard (board, card);
		setBoard(play.board);
		if (play.won) setWonPlay (true);
	}
	const cardTable = board.map (card =>
		<Card
			key={card.id}
			id={card.id}
			img={card.imgSrc}
			width={100}
			height={100}
			clicked={() => handleClick (card)}
			flipped={card.flipped}
		/>
	);
	return (
		<Layout>
			<h1>MemTyles</h1>
			<ClearButton />
			{wonPlay && <h6>You won!</h6>}
			{cardTable}
		</Layout>
	);
}

