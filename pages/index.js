import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

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
	{id : 9,  imgSrc : "/img/card9.png", flipped : false, won : false},
	{id : 10,  imgSrc : "/img/card10.png", flipped : false, won : false},
	{id : 11,  imgSrc : "/img/card11.png", flipped : false, won : false},
	{id : 12,  imgSrc : "/img/card12.png", flipped : false, won : false},
	{id : 13,  imgSrc : "/img/card13.png", flipped : false, won : false},
	{id : 14,  imgSrc : "/img/card14.png", flipped : false, won : false},
	{id : 15,  imgSrc : "/img/card15.png", flipped : false, won : false},
	{id : 16,  imgSrc : "/img/card16.png", flipped : false, won : false},
];

function Card ({id, imgSrc, width, height, clicked, flipped, won}) {
	return (
		<div onClick={clicked} className={flipped ? utilStyles.cardFlipped : utilStyles.cardUnflipped}>
			<img
				className={flipped ? utilStyles.imgUnflipped : utilStyles.imgFlipped}
				src={flipped ? imgSrc : won ? imgSrc : "/img/back.png" }
				width={width}
				height={height}
			/>
			{/*flipped ? <p>Flipped</p> : won ? <p>Won!</p> : <p>Not Flipped</p>*/}
			{won ? <p>Matched!</p> : <p>&nbsp;</p>}
		</div>
	);
}

// Shuffle only the images, not the ids as they match the arrary indeces.
// Shuffle the whole thing first then set the ids.
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
//
function shuffleCards (cards, numCards) {
  let selectedCards = cards.slice (0, parseInt (numCards / 2));
  console.log ("selectedCards : ", selectedCards, numCards);
  let doubledUp     = [...selectedCards, ...selectedCards];
  let currentIndex = doubledUp.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [doubledUp[currentIndex], doubledUp[randomIndex]] = [doubledUp[randomIndex], doubledUp[currentIndex]];
  }
  // Ids in order. A for (let i ...) loop setting doubledUp[i].id = i does not work well.
  // https://stackoverflow.com/questions/39827087/add-key-value-pair-to-all-objects-in-array
  //
  let indexedCards = doubledUp.map((card, index) => ({...card, id : index}));
  return indexedCards;
}

export default function Game () {

	const [board, setBoard]           = useState (initBoard);
	const [wonPlay, setWonPlay]       = useState (false);
	const [wonAllPlay, setWonAllPlay] = useState (false);
	const [numCards, setNumCards]     = useState (8);
	const [numClicks, setNumClicks]   = useState (0);
	const [timePlayed,setTimePlayed]  = useState(0);
	const numCardsRef                 = useRef();

	// https://stackoverflow.com/questions/63409136/set-countdown-timer-react-js
	//
	function updateTime () {
		setTimePlayed ((timePlayed) => timePlayed + 1)
	}

	// When all loaded up, then shuffle the cards to avoid a hydration error.
	// useState (shuffleCards(initBoard.slice()) gave hydration errors.
	// Slice to be safe - copies the array.
	// Do this when numCards changes too.
	//
	useEffect(() => {
		let shuffledBoard = shuffleCards(initBoard.slice(), numCards);
		setBoard (shuffledBoard);
		const token = setInterval(updateTime, 1000); // stInterval not setTimer
		return function cleanUp() {
			clearTimeout(token);
		}
	}, [numCards])

	function flipCard (card) {
		setNumClicks (numClicks + 1);

		// Count the number of already flipped cards, and stop if this is the third one.
		//
		let notPoss    = false;
		let won        = false;
		let wonAll     = false;
		if (card.won) {
			notPoss = true;
		} else {
			let numFlipped = 0;
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
		}


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
						break;
					} else {
						matches = thisCard.imgSrc;
						card1   = thisCard;
					}
				}
			}
			if (typeof(card1) !== "undefined" && typeof(card2) !== "undefined") {

				// Set flipped back to false and won to true to leave the square
				// on the board in its place. Same as the one with cards, don't move things
				// about.
				//
				newBoard[card1.id] = {id : card1.id,  imgSrc : card1.imgSrc, flipped : false, won : true};
				newBoard[card2.id] = {id : card2.id,  imgSrc : card2.imgSrc, flipped : false, won : true};
			}

			// Check for overall winner, all cards won.
			//
			let wonCount =0;
			for (let i=0; i < newBoard.length; i++) {
				if (newBoard[i].won) wonCount++;
			}
			if (wonCount === newBoard.length) {
				wonAll  = true;
			}
			console.log ("wonCount, board.length : ", wonCount, newBoard.length);
			setBoard (newBoard);
		}
		return {won : won, wonAll : wonAll};
	}

	function clearBoard () {
		let shuffledCards = shuffleCards(initBoard.slice(), numCards); // slice to make a copy of the initBoard rather than a reference which seems to have been used by the state, or soemthing.
		setBoard(shuffledCards);
		setWonPlay(false);
		setWonAllPlay(false);
		setNumClicks(0);
		setTimePlayed(0);
	}
	function ClearButton () {
		return (
			<button
				className={utilStyles.button}
				onClick={clearBoard}
			>
				Clear Board
			</button>
		);
	}
	function changeNumCards () {
		setNumCards  (numCardsRef.current.value);
		setWonPlay   (false);
		setWonAllPlay(false);
	}
	function SelectNumCards () {
		return (
			<Form>
				<Form.Label>Select Number of Tyles</Form.Label>
				<Form.Select
					ref={numCardsRef}
					onChange={() => changeNumCards ()}
					aria-label="Select number of Cards"
					value={numCards}
				>
					<option value="8">8</option>
					<option value="12">12</option>
					<option value="18">18</option>
					<option value="24">24</option>
					<option value="36">36</option>
				</Form.Select>
			</Form>
		);
	}
	function Progress () {
		if (numClicks > 0 && ! wonAllPlay) {
			return (
				<p>Goes : {numClicks}</p>
			);
		} else if (wonAllPlay) {
			return (
				<p>You did {numCards} Tyles in {numClicks} goes.</p>
			);
		} else {
			return (
				<p>Select only two cards, click again to turn back over</p>
			);
		}
	}

	function handleClick (card) {
		let { won, wonAll } = flipCard (card);
		if (won)    setWonPlay    (true);
		if (wonAll) setWonAllPlay (true);
	}
	const cardTable = board.map (card => {
		return <Col key={card.id} xs={6} sm={4} md={2} lg={2}>
			<Card
				key={card.id}
				id={card.id}
				imgSrc={card.imgSrc}
				width={100}
				height={100}
				clicked={() => handleClick (card)}
				flipped={card.flipped}
				won={card.won}
			/>
		</Col>
	});
	return (
		<Layout>
			<h1>MemTyles</h1>
			<Container fluid>
				<Row>
					<Col md={3}>
						<ClearButton />
					</Col>
					<Col md={3}>
						{new Date(timePlayed * 1000).toISOString().slice(11, 19)}
						<Progress />
					</Col>
					<Col md={3}>
						<SelectNumCards />
					</Col>
					<Col md={3}>
						{wonAllPlay && <h5>You&#39;ve won the Game!</h5>}
					</Col>
				</Row>
				<Row>
					{cardTable}
				</Row>
			</Container>
		</Layout>
	);
}

