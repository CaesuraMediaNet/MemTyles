import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// ToDo : Unflip unwon ones rather than clear the board entirely.
// Win all splash.

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
			{flipped ? <p>Flipped</p> : won ? <p>Won!</p> : <p>Not Flipped</p>}
		</div>
	);
}



export default function Game () {
	const [board, setBoard]           = useState (initBoard);
	const [wonPlay, setWonPlay]       = useState (false);

	function flipCard (card) {

		// Count the number of already flipped cards, and stop if this is the third one.
		//
		let notPoss    = false;
		let numFlipped = 0;
		let won        = false;
		for (let i=0; i < board.length; i++) {
			let thisCard = board[i];

			// If this card has been clicked, then unflip it, and don't increase the count.
			//
			if (thisCard.flipped && !card.flipped) {
				numFlipped++;
			}
			if (numFlipped > 1) {
				notPoss = true;
				break;
			}
		};

		if (!notPoss) {

			// Change the one element to be flipped
			//
			let newBoard = [];
			board.forEach (thisCard => {
				if (thisCard.id === card.id) {
					newBoard.push ({
						id      : card.id,
						imgSrc  : card.imgSrc,
						flipped : !card.flipped, // toggle the flip - in case it needs unflipping.
						won     : false,
					});
				} else {
					newBoard.push ({...thisCard});
				}
			});

			// Now see if this flipped card matches any previous one.
			//
			let card1, card2;
			let matches = false;
			for (let i=0; i < newBoard.length; i++) {
				let thisCard = newBoard[i];
				if (thisCard.flipped) {
					if (matches && matches === thisCard.imgSrc) {
						won   = true;
						card2 = thisCard;
						console.log ("You won!", card1, card2);
						break;
					} else {
						matches = thisCard.imgSrc;
						card1   = thisCard;
					}
				}
			}
			if (typeof(card1) !== "undefined" && typeof(card2) !== "undefined") {
				console.log ("Cards matching : ", card1, card2);

				// Set flipped back to false and won to true to leave the square
				// on the board in its place. Same as the one with cards, don't move things
				// about.
				//
				newBoard[card1.id] = {id : card1.id,  imgSrc : card1.imgSrc, flipped : false, won : true};
				newBoard[card2.id] = {id : card2.id,  imgSrc : card2.imgSrc, flipped : false, won : true};
			}

			setBoard (newBoard);
		}
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

