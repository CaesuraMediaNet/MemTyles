import utilStyles from '../styles/utils.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Use react-cookie instead : error Error [ReferenceError]: document is not defined
//
const cookieName = "scores";
export function getScores () {
	let scores = "[]";
	return JSON.parse (scores);
}
export function addScore (score) {
	let scores = getScores();
	scores.push (score);
	return scores;
}

export default function Scores ({stop, reset}) {
	const [numClicks, setNumClicks]   = useState(0);
    const [timePlayed,setTimePlayed]  = useState(0);
    const [gameTime,setGameTime]      = useState(0);
    const [token,setToken]            = useState(0);

	// https://stackoverflow.com/questions/63409136/set-countdown-timer-react-js
    //
    function updateTime () {
        setTimePlayed ((timePlayed) => timePlayed + 1)
    }
	function stopTimer () {
		clearTimeout(token);
	}
	useEffect(() => {
		console.log ("useEffect : ", stop, reset);
		if (reset) {
			setTimePlayed ((timePlayed) => 0);
		} else if (stop) {
			clearTimeout(token);
		} else {
			const intervalId = setInterval(updateTime, 1000);
			setToken (intervalId);
			return function cleanUp() {
				clearTimeout(token);
			}
		}
    }, [stop, reset]);

	return (
		stop ? (
			<p>Time played : {new Date(timePlayed * 1000).toISOString().slice(11, 19)}</p>
		) : (
			<p>Playing : {new Date(timePlayed * 1000).toISOString().slice(11, 19)}</p>
		)

	);
}
