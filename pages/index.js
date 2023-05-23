// ToDo 
// o	Instructions with pictures and dismiss in Coookies.
// o	Move all styles to one stylesheet.
// o	Move functions into components/ or functions/
// o	Goes : 0 initially, not short instructions
// o	Same resize for won Tyles for the bigger icons.
// o	Google Ads
// o	Privacy notice.
// o	Centred won modal.
// o	memtyles.com register and point to Vercel.

// Next.js
//
import Head from 'next/head';
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';
import Layout, { siteTitle } from '../components/layout';

// React.js
//
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

// External React Libraries.
//
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import BsCard from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faUserSecret,
	faQuestion,
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

// Local Components.
//
import Card from '../components/Card';
import GameClock from '../components/scores';
import WonModal from '../components/WonModal';
import MtRow from '../components/MtRow';
import CardTable from '../components/CardTable';
import Instructions from '../components/Instructions';

// Local functions.
//
import shuffleCards from '../functions/shuffleCards';
import flipCard from '../functions/flipCard';
import {addScore, getScores, clearScores} from '../functions/scores';



// Clues : The GameClock sets the timer and when told to stop (in handleTyleClick after calcs have been
// done to see if game is complete) then calls timeGameTook (via it's gameTime prop). timeGameTook
// sets this App gameTime (via setGameTime) state for display and storing in a cookie. Scores (in a cookie)
// and shuffling the pack occur initially in the useEffect hook.
// More clues TBD.

const initBoard = [
	{id : 0,   icon : faEnvelope,          cardName : "Envelope,",         flipped : false, won : false},
	{id : 1,   icon : faHippo,             cardName : "Hippo",             flipped : false, won : false},
	{id : 2,   icon : faUmbrella,          cardName : "Umbrella",          flipped : false, won : false},
	{id : 3,   icon : faGift,              cardName : "Gift",              flipped : false, won : false},
	{id : 4,   icon : faRocket,            cardName : "Rocket",            flipped : false, won : false},
	{id : 5,   icon : faLemon,             cardName : "Lemon",             flipped : false, won : false},
	{id : 6,   icon : faBrush,             cardName : "Brush",             flipped : false, won : false},
	{id : 7,   icon : faMagicWandSparkles, cardName : "MagicWandSparkles", flipped : false, won : false},
	{id : 8,   icon : faBell,              cardName : "Bell",              flipped : false, won : false},
	{id : 9,   icon : faBarcode,           cardName : "Barcode",           flipped : false, won : false},
	{id : 10,  icon : faKey,               cardName : "Key",               flipped : false, won : false},
	{id : 11,  icon : faPaintRoller,       cardName : "PaintRoller",       flipped : false, won : false},
	{id : 12,  icon : faBicycle,           cardName : "Bicycle",           flipped : false, won : false},
	{id : 13,  icon : faFeather,           cardName : "Feather",           flipped : false, won : false},
	{id : 14,  icon : faBinoculars,        cardName : "Binoculars",        flipped : false, won : false},
	{id : 15,  icon : faShirt,             cardName : "Shirt",             flipped : false, won : false},
	{id : 16,  icon : faCarSide,           cardName : "CarSide",           flipped : false, won : false},
	{id : 17,  icon : faMountainSun,       cardName : "MountainSun",       flipped : false, won : false},
	{id : 18,  icon : faHourglassStart,    cardName : "HourglassStart",    flipped : false, won : false},
	{id : 19,  icon : faStore,             cardName : "Store",             flipped : false, won : false},
	{id : 20,  icon : faMoon,              cardName : "Moon",              flipped : false, won : false},
	{id : 21,  icon : faHotel,             cardName : "Hotel",             flipped : false, won : false},
	{id : 22,  icon : faWrench,            cardName : "Wrench",            flipped : false, won : false},
	{id : 23,  icon : faTrophy,            cardName : "Trophy",            flipped : false, won : false},
	{id : 24,  icon : faMotorcycle,        cardName : "Motorcycle",        flipped : false, won : false},
	{id : 25,  icon : faRadio,             cardName : "Radio",             flipped : false, won : false},
	{id : 26,  icon : faDragon,            cardName : "Dragon",            flipped : false, won : false},
	{id : 27,  icon : faScroll,            cardName : "Scroll,",           flipped : false, won : false},
];

export default function Game () {

	const [board, setBoard]                         = useState (initBoard);
	const [wonPlay, setWonPlay]                     = useState (false);
	const [wonAllPlay, setWonAllPlay]               = useState (false);
	const [numCards, setNumCards]                   = useState (12);
	const [numClicks, setNumClicks]                 = useState (0);
	const [gameTime,setGameTime]                    = useState(0);
	const [timerAction,setTimerAction]              = useState("start");
	const [scores,setScores]                        = useState ([]);
	const [showInstructions, setShowInstructions]   = useState (true);

	const numCardsRef                               = useRef();
	const instructionsRef                           = useRef();

	// When all loaded up, then shuffle the cards to avoid a hydration error.
	// useState (shuffleCards(initBoard.slice()) gave hydration errors.
	// Slice to be safe - copies the array.
	// Do this when numCards changes too.
	//
	useEffect(() => {
		let shuffledBoard = shuffleCards(initBoard.slice(), numCards);
		setBoard        (shuffledBoard);
		let currentScores = getScores();
		setScores ((scores) => currentScores);
	}, [numCards])


	function clearBoard () {
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
					value={numCardsRef?.current?.value || "12"}
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
	function clearScoresScreen () {
		clearScores ();
		setScores (scores => []);
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
			<ul style={{textAlign : "left", marginTop : "10px"}}>
			<h5>Past Scores</h5>
			{scores.map ((score, index) => 
				<li key={index}>
					Cards : {score.numCards} Clicks : {score.numClicks} Time : {score.gameTime}
				</li>
			)}
			<button
				className={utilStyles.button}
				 onClick={clearScoresScreen}
			>
				Clear Scores
			</button>
			</ul>
			</>
		);
	}
	function handleTyleClick (card) {
		let { won, wonAll } = flipCard (card, numClicks, setNumClicks, board, setBoard);
		if (won)    setWonPlay    (true);
		if (wonAll) {
			setWonAllPlay (true);
			setTimerAction ((timerAction) => "stop");
		}
	}
	function scrollToInstructions () {
		if (showInstructions) instructionsRef.current.scrollIntoView({ behavior: 'smooth' });
	}
	return (
		<Layout>
			<Container fluid>
				<BsCard style={{
						border : "1px solid #2dce89",
						display:"flex",
						alignItems:"center",
						paddingBottom:"3rem"
					}}>
					<h1>MemTyles</h1>
					<FontAwesomeIcon
						style={{position:"absolute", right : "5px", top : "5px", width : "15px"}}
						icon={faQuestion}
						onClick={() => setShowInstructions(true)}
						title={"Help"}
					/>
					<FontAwesomeIcon
						style={{position:"absolute", left : "5px", top : "5px", width : "20px"}}
						icon={faUserSecret}
						onClick={() => setShowInstructions(true)}
						title={"Privacy Policy"}
					/>

					{showInstructions && <p
						style={{textDecoration : "underline", color : "#2dce89", cursor : "pointer"   }}
						onClick={scrollToInstructions}
					>
						Click to see Instructions
					</p>}
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
					<div style={{ maxWidth : "650px"}} >
						<MtRow>
							<CardTable
								board={board}
								Card={Card}
								handleTyleClick={handleTyleClick}
								numCards={numCards}
							/>
						</MtRow>
					</div>
				</BsCard>
			</Container>
			{scores.length > 0 && <ScoresTable />}
			{wonAllPlay && <WonModal numClicks={numClicks} gameTime={gameTime} numTyles={numCards} />}
			{showInstructions && 
				<>
				<h5 ref={instructionsRef}>Instructions</h5>
				<p onClick={() => setShowInstructions(false)}
					style={{textDecoration : "underline", color : "#2dce89", cursor : "pointer"}}
                >
					Don&#39;t show again
				</p>

				<Instructions />
				</>
			}
		</Layout>
	);
}

