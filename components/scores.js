// Use react-cookie instead : error Error [ReferenceError]: document is not defined

const cookieName = "scores";
export function Scores () {
	let scores = "[]";
	/*
	const cookies = document.cookie.split(';');
	cookies.forEach((cookie) => {
		if(cookie.startsWith(`${cookieName}`)) {
			scores = cookie.replace(`${cookieName}=`,"");
		}
	});
	*/
	return JSON.parse (scores);
}
export function addScore (score) {
	let scores = Scores();
	scores.push (score);
	// document.cookie = `${cookieName}=${JSON.stringify(scores)}`;
}
