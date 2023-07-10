// Scores kept in Cookies, maybe a database later.
//
import Cookies from 'js-cookie';

export function addScore (score) {
   let scores = getScores ();
   scores.push (score);
   Cookies.set('scores', JSON.stringify (scores));
   return scores;
}
export function getScores () {
   let scores = Cookies.get('scores');
   if (!scores?.length) {
      scores = [];
   } else {
      scores = JSON.parse (scores);
   }
   return scores;
}
export function clearScores () {
   Cookies.set('scores', JSON.stringify ([]));
}

