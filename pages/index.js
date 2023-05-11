import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
	{id : 0,  imgSrc : "/img/card0.png", flipped : false, won : false},
	{id : 1,  imgSrc : "/img/card1.png", flipped : false, won : false},
	{id : 2,  imgSrc : "/img/card2.png", flipped : false, won : false},
	{id : 3,  imgSrc : "/img/card3.png", flipped : false, won : false},
	{id : 4,  imgSrc : "/img/card4.png", flipped : false, won : false},
	{id : 5,  imgSrc : "/img/card5.png", flipped : false, won : false},
	{id : 6,  imgSrc : "/img/card6.png", flipped : false, won : false},
	{id : 7,  imgSrc : "/img/card7.png", flipped : false, won : false},
	{id : 8,  imgSrc : "/img/card8.png", flipped : false, won : false},
	{id : 9,  imgSrc : "/img/card0.png", flipped : false, won : false},
	{id : 10, imgSrc : "/img/card1.png", flipped : false, won : false},
	{id : 11, imgSrc : "/img/card2.png", flipped : false, won : false},
	{id : 12, imgSrc : "/img/card3.png", flipped : false, won : false},
	{id : 13, imgSrc : "/img/card4.png", flipped : false, won : false},
	{id : 14, imgSrc : "/img/card5.png", flipped : false, won : false},
	{id : 15, imgSrc : "/img/card6.png", flipped : false, won : false},
	{id : 16, imgSrc : "/img/card7.png", flipped : false, won : false},
	{id : 17, imgSrc : "/img/card8.png", flipped : false, won : false},
];

function Card ({id, imgSrc, width, height, clicked, flipped, won}) {
	return (
		<div onClick={clicked} className={utilStyles.card}>
			<p>{id}</p>
			<img src={imgSrc} width={width} height={height} />
			{flipped ? <p>Flipped</p> : <p>Not Flipped</p>}
			{won     && <p>WON!</p>}
		</div>
	);
}



export default function Game () {
	const [board, setBoard]           = useState (initBoard);
	const [wonPlay, setWonPlay]       = useState (false);
	const [numFlipped, setNumFlipped] = useState (0);
	const [notPoss, setNotPoss]       = useState (false);
	const [matches, setMatches]       = useState ();
	const [won, setWon]               = useState (false);
	const [card1, setCard1]           = useState ();
	const [card2, setCard2]           = useState ();

	/*
	console.log ("numFlipped : " + numFlipped);
	console.log ("notPoss : ", notPoss);
	console.log ("matches : ", matches);
	console.log ("won : ", won);
	console.log ("card1 : ", card1);
	console.log ("card2 : ", card2);
	*/

	function flipCard (card) {

		// Count the number of already flipped cards, and stop if this is the third one.
		//
		for (let i=0; i < board.length; i++) {
			let thisCard = board[i];
			if (thisCard.flipped) {
				setNumFlipped (numFlipped + 1);
			}
			if (numFlipped > 1) {
				setNotPoss(true);
				break;
			}
		};
		console.log ("numFlipped [2]: " + numFlipped); // this is 0, wha? When console.log above is 1

		if (!notPoss) {
			// Change the one element to be flipped
			//
			let newBoard = [];
			board.forEach (thisCard => {
				if (thisCard.id === card.id) {
					newBoard.push ({
						id      : card.id,
						imgSrc  : card.imgSrc,
						flipped : true,
						won     : false,
					});
				} else {
					newBoard.push ({...thisCard});
				}
			});
			console.log ("newBoard : ", newBoard);

			// Now see if this flipped card matches any previous one.
			//
			for (let i=0; i < newBoard.length; i++) {
				let thisCard = newBoard[i];
				if (thisCard.flipped) {
					if (matches && matches === thisCard.imgSrc) {
						setWon(true);
						setCard2(thisCard);
						console.log ("You won!", card1, card2);
						break;
					} else {
						setMatches(thisCard.imgSrc);
						setCard1(thisCard);
					}
				}
			}
			if (typeof(card1) !== "undefined" && typeof(card2) !== "undefined") {
				console.log ("Cards matching : ", card1, card2);
			}
			setBoard (newBoard);
		}
		/*
		setWon(false);
		setCard1();
		setCard2();
		setMatches();
		setNotPoss (false);
		setNumFlipped(0);
		*/
		return {won : won};
	}

	function clearBoard () {
		setBoard(initBoard);
		setWonPlay(false);
	}
	function ClearButton () {
		return (
			<button
				className={utilStyles.button}
				onClick={() => clearBoard(initBoard)}
			>
				Clear Board
			</button>
		);
	}
	function handleClick (card) {
		let { won } = flipCard (card);
		console.log ("Board after flipCard : ", board);
		if (won) setWonPlay (true);
	}
	const cardTable = board.map (card => 
		<Col key={card.id} md={3}>
			<Card
				key={card.id}
				id={card.id}
				img={card.imgSrc}
				width={100}
				height={100}
				clicked={() => handleClick (card)}
				flipped={card.flipped}
				won={card.won}
			/>
		</Col>
	);
	return (
		<Layout>
			<h1>MemTyles</h1>
			<ClearButton />
			{wonPlay && <h6>You won!</h6>}
			<Container>
				<Row>
					{cardTable}
				</Row>
			</Container>
		</Layout>
	);
}

