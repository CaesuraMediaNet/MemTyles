import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function GameClock ({action, gameTime}) {
    const [timePlayed,setTimePlayed]  = useState(0);
    const [token,setToken]            = useState(0);

    function updateTime () {
        setTimePlayed ((timePlayed) => timePlayed + 1)
    }
   function stopTimer () {
      clearTimeout(token);

      // Send total game time to the parent.
      //
      gameTime ({timeS : timePlayed});
   }
   useEffect(() => {
      if (action === "stop") {
         stopTimer ();
      } else if (action.match (/^reset/)) { // reset1684323218711 - so that action changes but reset is the value.
         setTimePlayed ((timePlayed) => 0);
      } else if (action.match (/start/)) {
         if (action === "restart") {
            setTimePlayed ((timePlayed) => 0);
         }
         const intervalId = setInterval(updateTime, 1000);
         setToken (intervalId);
         return function cleanUp() {
            clearTimeout(token);
         }
      }
    }, [action]); // Do this whenever action changes.

   return (
      action === "stop" ? (
         <span>Time played : {new Date(timePlayed * 1000).toISOString().slice(11, 19)}</span>
      ) : (
         <span>              {new Date(timePlayed * 1000).toISOString().slice(11, 19)}</span>
      )
   );
}
