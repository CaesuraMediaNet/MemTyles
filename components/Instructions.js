// The comprehensive instructions which show example boards and a video.
//
import { useRef } from 'react';
import utilStyles from '../styles/utils.module.css';

export default function Instructions () {
	return (
		<>
		<p>The board is made up of pairs of pictures, or Tyles as we call them, like this : </p>
		<img style={{maxWidth: "100%", height:"auto"}} src="/img/wonGame.png" />
		<p>At the start of the game the board has all Tyles turned over, showing the jigsaw image : </p>
		<img style={{maxWidth: "100%", height:"auto"}} src="/img/startGame.png" />
		<p>The game is to turn over pairs of Tyles, by clicking on the Jigsaw pictures, to find the matching ones, like this : </p>
		<img style={{maxWidth: "100%", height:"auto"}} src="/img/twoMatchingTyles.png" />
		<p>Only two Tyles can be turned over at any one time, clicking on any more will not do anything.</p>
		<p>If your two Tyles do not match ... </p>
		<img style={{maxWidth: "100%", height:"auto"}} src="/img/twoMisMatchingTyles.png" />
		<p> ...you can turn either one back over by clicking on it again (the hippo here) : </p>
		<img style={{maxWidth: "100%", height:"auto"}} src="/img/oneTyleShowingOnly.png" />
		<p>If your two Tyles match, then they become a bit opaque and cannot be clicked on again, and you can select two more Tyles : </p>
		<img style={{maxWidth: "100%", height:"auto"}} src="/img/twoMatchingTyles.png" />
		<p>When all Tyles are matched, you have won the game!</p>
		<p>You can change the number of Tyles on the board with the selector at the top.  We have
			started you on 12, but you can select 4 (easy!), 12, 16, 20, 36, 42 or if you are feeling brave, 56.</p>
		<p>You can restart the game using the Clear Board button at the top : </p>
		<img style={{maxWidth: "100%", height:"auto"}} src="/img/clearBoardButton.png" />
		<p>Your scores are in the Past Scores section.  They are saved in Cookies, so no scores are
			recorded by us.</p>
		</>

	);
	
}


