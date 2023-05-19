import Head from 'next/head';
import Image from 'next/image';

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
import BsCard from 'react-bootstrap/Card';

import Cookies from 'js-cookie';
import GameClock from '../components/scores';
import WonModal from '../components/WonModal';
import MtRow from '../components/MtRow';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faEnvelope,
	faRocket,
	faHippo,
	faUmbrella,
	faGift,
	faLemon,
	faBrush,
	faMagicWandSparkles,
	faBell,
	faBarcode,
	faKey,
	faPaintRoller,
	faBicycle,
	faFeather,
	faBinoculars,
	faShirt,
	faCarSide,
	faMountainSun,
	faHourglassStart,
	faStore,
	faMoon,
	faHotel,
	faWrench,
	faTrophy,
	faMotorcycle,
	faRadio,
	faDragon,
	faScroll,
	faPuzzlePiece,
} from '@fortawesome/free-solid-svg-icons'

const colours = [
	"#622569",
	"#d96459",
	"#e06377",
	"#667292",
	"#87bdd8",
	"#c1502e",
	"#4f3222",
	"#77a8a8",
	"#3b3a30",
	"#4040a1",
	"#36486b",
	"#50394c",
	"#034f84",
	"#b1cbbb",
	"#405d27",
	"#3e4444",
	"#eca1a6",
	"#d64161",
	"#6b5b95",
	"#c83349",
	"#563f46",
	"#8000FF",
	"#FF0080",
	"#C21460",
	"#66B032",
	"#347C98",
	"#4424D6",
	"#FC600A",
];


// Clues : The GameClock sets the timer and when told to stop (in handleClick after calcs have been
// done to see if game is complete) then calls timeGameTook (via it's gameTime prop). timeGameTook
// sets this App gameTime (via setGameTime) state for display and storing in a cookie. Scores (in a cookie)
// and shuffling the pack occur initially in the useEffect hook.
// More clues TBD.

const initBoard = [
	{id : 0,  icon : faEnvelope,          cardName : "Envelope,",         flipped : false, won : false},
	{id : 1,  icon : faRocket,            cardName : "Rocket",            flipped : false, won : false},
	{id : 2,  icon : faHippo,             cardName : "Hippo",             flipped : false, won : false},
	{id : 3,  icon : faUmbrella,          cardName : "Umbrella",          flipped : false, won : false},
	{id : 4,  icon : faGift,              cardName : "Gift",              flipped : false, won : false},
	{id : 5,  icon : faLemon,             cardName : "Lemon",             flipped : false, won : false},
	{id : 6,  icon : faBrush,             cardName : "Brush",             flipped : false, won : false},
	{id : 7,  icon : faMagicWandSparkles, cardName : "MagicWandSparkles", flipped : false, won : false},
	{id : 8,  icon : faBell,              cardName : "Bell",              flipped : false, won : false},
	{id : 9,  icon : faBarcode,           cardName : "Barcode",           flipped : false, won : false},
	{id : 10,  icon : faKey,              cardName : "Key",               flipped : false, won : false},
	{id : 11,  icon : faPaintRoller,      cardName : "PaintRoller",       flipped : false, won : false},
	{id : 12,  icon : faBicycle,          cardName : "Bicycle",           flipped : false, won : false},
	{id : 13,  icon : faFeather,          cardName : "Feather",           flipped : false, won : false},
	{id : 14,  icon : faBinoculars,       cardName : "Binoculars",        flipped : false, won : false},
	{id : 15,  icon : faShirt,            cardName : "Shirt",             flipped : false, won : false},
	{id : 16,  icon : faCarSide,          cardName : "CarSide",           flipped : false, won : false},
	{id : 17,  icon : faMountainSun,      cardName : "MountainSun",       flipped : false, won : false},
	{id : 18,  icon : faHourglassStart,   cardName : "HourglassStart",    flipped : false, won : false},
	{id : 19,  icon : faStore,            cardName : "Store",             flipped : false, won : false},
	{id : 20,  icon : faMoon,             cardName : "Moon",              flipped : false, won : false},
	{id : 21,  icon : faHotel,            cardName : "Hotel",             flipped : false, won : false},
	{id : 22,  icon : faWrench,           cardName : "Wrench",            flipped : false, won : false},
	{id : 23,  icon : faTrophy,           cardName : "Trophy",            flipped : false, won : false},
	{id : 24,  icon : faMotorcycle,       cardName : "Motorcycle",        flipped : false, won : false},
	{id : 25,  icon : faRadio,            cardName : "Radio",             flipped : false, won : false},
	{id : 26,  icon : faDragon,           cardName : "Dragon",            flipped : false, won : false},
	{id : 27,  icon : faScroll,           cardName : "Scroll,",           flipped : false, won : false},
];

function Card ({id, icon, width, height, clicked, flipped, won, colour, cardName}) {
	let iconStyle = {
		width : 50,
		color:colour,
		padding : "5px",
		height : "100%",
		width : "100%",
	}
	let blankStyle         = {...iconStyle, color:"dimgray"};
	let selectedStyle      = {...iconStyle, border : "1px solid green", borderRadius : "0.2rem",};
	let wonStyle           = {...iconStyle, opacity : 0.6};

	// Some icons are bigger than others moving the page about.
	//
	let reduceBigIconStyle = {...selectedStyle, width : "75%"};
	if (cardName.match (/Moon|Brush|Lemon|Bell|HourglassStart/i)) {
		selectedStyle = reduceBigIconStyle;
	}
	return (
		<div style={{width : "100%", height : "100%"}} onClick={clicked} >
			{flipped ? 
				<FontAwesomeIcon style={selectedStyle} icon={icon} />
				: won ?
				<FontAwesomeIcon style={wonStyle}      icon={icon} />
				:
				<FontAwesomeIcon style={blankStyle}    icon={faPuzzlePiece} />
			}
		</div>
	);
}

// Shuffle only the images, not the ids as they match the arrary indeces.
// Shuffle the whole thing first then set the ids.
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// AKJC TODO : Randomise the cards first, then double up, then random again.
//
function shuffleCards (cards, numCards) {
  let selectedCards = cards.slice (0, parseInt (numCards / 2));

  // Add a random colour to the first list.
  //
  let randomColours = [];
  selectedCards.forEach (card => {
	  let colour        = colours[Math.floor(Math.random() * (colours.length - 1))];
	  randomColours.push (colour);
  });
  selectedCards     = selectedCards.map((card, index) => ({...card, colour : randomColours[index]}));
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
  // Ids in order. A for (let i ...) loop setting doubledUp[i].id = i does not work.
  // https://stackoverflow.com/questions/39827087/add-key-value-pair-to-all-objects-in-array
  //
  let indexedCards = doubledUp.map((card, index) => ({...card, id : index}));

  return indexedCards;
}

export default function Game () {

	const [board, setBoard]             = useState (initBoard);
	const [wonPlay, setWonPlay]         = useState (false);
	const [wonAllPlay, setWonAllPlay]   = useState (false);
	const [numCards, setNumCards]       = useState (4);
	const [numClicks, setNumClicks]     = useState (0);
	const [gameTime,setGameTime]        = useState(0);
	const [timerAction,setTimerAction]  = useState("start");
	const [scores,setScores]            = useState ([]);
	const numCardsRef                   = useRef();

	// When all loaded up, then shuffle the cards to avoid a hydration error.
	// useState (shuffleCards(initBoard.slice()) gave hydration errors.
	// Slice to be safe - copies the array.
	// Do this when numCards changes too.
	//
	useEffect(() => {
		let shuffledBoard = shuffleCards(initBoard.slice(), numCards);
		setBoard (shuffledBoard);
		let currentScores = getScores();
		setScores ((scores) => currentScores);
	}, [numCards])

	// AKJC TODO : Put this in a ./functions/ dir. Add board as a param.
	//
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
					newBoard.push ({...card, flipped : !card.flipped});
				} else {
					newBoard.push ({...thisCard});
				}
			});

			// Now see if this flipped card matches any previous one.
			//
			let card1, card2;
			let matches = "";
			for (let i=0; i < newBoard.length; i++) {
				let thisCard = newBoard[i];
				if (thisCard.flipped) {
					if (matches && matches === thisCard.cardName) {
						won   = true;
						card2 = thisCard;
						break;
					} else {
						matches = thisCard.cardName;
						card1   = thisCard;
					}
				}
			}
			if (typeof(card1) !== "undefined" && typeof(card2) !== "undefined") {

				// Set flipped back to false and won to true to leave the square
				// on the board in its place. Same as the one with cards, don't move things
				// about.
				//
				newBoard[card1.id] = {...card1, won : true, flipped : false};
				newBoard[card2.id] = {...card2, won : true, flipped : false};
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
			setBoard (newBoard);
		}
		return {won : won, wonAll : wonAll};
	}
	function clearBoard () {

		// .slice() to make a copy of the initBoard rather than a reference which seems to have been used by the state, or something.
		//
		let shuffledCards = shuffleCards(initBoard.slice(), numCards);
		setBoard(shuffledCards);
		setWonPlay(false);
		setWonAllPlay(false);
		setNumClicks(0);
		let now                = Date.now();
		let action             = "reset" + now; // Keep resetting on button click, but action is still "reset".
		if (wonAllPlay) action = "restart";
		setTimerAction ((timerAction) => action);
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
		clearBoard ();
	}
	function SelectNumCards () {
		return (
			<Form>
				<Form.Label>Select Number of Tyles</Form.Label>
				<Form.Select
					ref={numCardsRef}
					onChange={() => changeNumCards ()}
					aria-label="Select number of Cards"
					value={numCardsRef?.current?.value || "4"}
				>
					<option value="4">4</option>
					<option value="12">12</option>
					<option value="16">16</option>
					<option value="20">20</option>
					<option value="36">36</option>
					<option value="42">42</option>
					<option value="56">56</option>
				</Form.Select>
			</Form>
		);
	}
	function addScore (score) {
		let scores = getScores ();
		scores.push (score);
		Cookies.set('scores', JSON.stringify (scores));
		return scores;
	}
	function getScores () {
		let scores = Cookies.get('scores');
		if (!scores?.length) {
			scores = [];
		} else {
			scores = JSON.parse (scores);
		}
		return scores;
	}
	function timeGameTook ({timeS}) {
		setGameTime ((gameTime) => timeS);
		let thisGame = {
			numCards  : numCards,
			numClicks : numClicks,
			gameTime  : timeS,
		}
		let allScores = addScore (thisGame);
		setScores (allScores);
	}
	function Progress () {
		if (numClicks > 0 && ! wonAllPlay) {
			return (
				<p>Goes : {numClicks}</p>
			);
		} else if (wonAllPlay) {
			return (
				<p>You did {numCards} Tyles in {numClicks} goes and {gameTime} seconds</p>
			);
		} else {
			return (
				<p>Select only two Tyles, click again to turn back over</p>
			);
		}
	}
	function ScoresTable () {
		return (
			<>
			<h6>Scores</h6>
			<ul>
			{scores.map ((score, index) => 
				<li key={index}>
					Cards : {score.numCards} Clicks : {score.numClicks} Time : {score.gameTime}
				</li>
			)}
			</ul>
			</>
		);
	}
	function handleClick (card) {
		let { won, wonAll } = flipCard (card);
		if (won)    setWonPlay    (true);
		if (wonAll) {
			setWonAllPlay (true);
			setTimerAction ((timerAction) => "stop");
		}
	}
	const cardTable = board.map (card => {
		let width = "25%";
		console.log ("cardTable numCards : ", numCards);
		if (numCards == 12) {
		}
		if (numCards == 16) {
		}
		if (numCards == 20) {
			width = "20%";
		}
		if (numCards == 36) {
			width = "16.6666666666%";
		}
		if (numCards == 42) {
			width = "14.285714%";
		}
		if (numCards == 56) {
			width = "12.5%";
		}
		return (
			<div key={card.id} style={{ padding : "10px", width : width }}>
				<Card 
					key={card.id}
					id={card.id}
					icon={card.icon}
					width={100}
					height={100}
					clicked={() => handleClick (card)}
					flipped={card.flipped}
					won={card.won}
					colour={card.colour}
					cardName={card.cardName}
				/>
			</div>
		);
	});
	return (
		<Layout>
			<Container fluid>
				<BsCard style={{display:"flex",alignItems:"center"}}>
					<h1>MemTyles</h1>
					<Row>
						<Col md={12}>
							<Row>
								<Col md={5}>
								</Col>
								<Col md={2}>
									<SelectNumCards />
								</Col>
								<Col md={5}>
								</Col>
							</Row>
						</Col>
						<Col md={12}>
							<ClearButton />
						</Col>
						<Col md={12}>
							<Progress />
							<GameClock gameTime={timeGameTook} action={timerAction}  />
						</Col>
						<Col md={12}>
							{wonAllPlay && <h5>You&#39;ve won the Game!</h5>}
						</Col>
					</Row>
					<div style={{ width : "75%"}} >
						<MtRow>
							{cardTable}
						</MtRow>
					</div>
				</BsCard>
			</Container>
			<ScoresTable />
			 {wonAllPlay && <WonModal numClicks={numClicks} gameTime={gameTime} numTyles={numCards} />}
		</Layout>
	);
}

