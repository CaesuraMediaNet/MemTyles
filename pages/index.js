// ToDo 
// x	Instructions with pictures and dismiss in Coookies.
// x	Same resize for won Tyles for the bigger icons.
// o	Google Ads
// x	Privacy notice.
// o	Centred won modal.
// x	memtyles.com register and point to Vercel.

// Next.js
//
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/memtyles.module.css';
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
import {initBoard} from '../components/boards';

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

export default function Game () {

	const [board, setBoard]                         = useState (initBoard);
	const [wonPlay, setWonPlay]                     = useState (false);
	const [wonAllPlay, setWonAllPlay]               = useState (false);
	const [numCards, setNumCards]                   = useState (12);
	const [numClicks, setNumClicks]                 = useState (0);
	const [gameTime,setGameTime]                    = useState(0);
	const [timerAction,setTimerAction]              = useState("start");
	const [scores,setScores]                        = useState ([]);
	const [showPrivacyLink, setShowPrivacyLink]     = useState (false);

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
				className={styles.button}
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
		if (wonAllPlay) {
			return (
				<p>You did {numCards} Tyles in {numClicks} goes and {gameTime} seconds</p>
			);
		} else {
			return (
				<p>Goes : {numClicks}</p>
			);
		}
	}
	function ScoresTable () {
		return (
			<>
				<ul className={styles.scoresTableUL}>
					<h5>Past Scores</h5>
					{scores.map ((score, index) => 
						<li key={index}>
							Cards : {score.numCards} Clicks : {score.numClicks} Time : {score.gameTime}
						</li>
					)}
					<button
						className={styles.button}
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
		instructionsRef.current.scrollIntoView({ behavior: 'smooth' });
	}
	return (
		<Layout>
			<Container fluid>
				<BsCard className={styles.BsCardStyle}>
					<h1>MemTyles</h1>
					<h1
						className={styles.navIconRight}
						onClick={() => scrollToInstructions()}
						title={"Help"}
					>
						?
					</h1>
					<span title={"Privacy Policy"}> {/* Bug with FontAwesomeIcon on title */}
						<FontAwesomeIcon
							className={styles.navIconLeft}
							icon={faUserSecret}
							onClick={() => setShowPrivacyLink (true)}
						/>
					</span>

					{showPrivacyLink && <p>
						<div class="card">
						<div class="card-body">
							<a
								href="https://vercel.com/legal/privacy-policy"
								target="_blank"
								rel="nofollow"
							>
								Here
							</a>
								&nbsp; is our privacy policy from Vercel, who hosts this site.  As a customer
								of Vercel (us) we do not collect any personal info from you at all,
								just what Vercel say&nbsp;:&nbsp;
								<a
									href="https://vercel.com/legal/privacy-policy"
									target="_blank"
									rel="nofollow"
								>
									https://vercel.com/legal/privacy-policy
								</a>
							
							<p className={[styles.gotItLink, styles.pLink].join (' ')}
								onClick={() => setShowPrivacyLink (false)}
							>
								Got it
							</p>
						</div>
						</div>
					</p>}
					<Row>
						<Col md={12}>
							<SelectNumCards />
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
					<div className={styles.desktopMaxWidth}>
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
			<h5 className={styles.instructionsH} ref={instructionsRef}>Instructions</h5>
			<Instructions />
		</Layout>
	);
}

