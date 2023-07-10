// The comprehensive instructions which show example boards and a video.
//
import { useRef } from 'react';
import styles from '../styles/memtyles.module.css';
import CardTable from './CardTable';
import Card from './Card';
import MtRow from '../components/MtRow';
import Container from 'react-bootstrap/Container';
import BsCard from 'react-bootstrap/Card';

// https://www.npmjs.com/package/shaka-player-react
// Next.js config.
//
import dynamic from 'next/dynamic';
const ShakaPlayer = dynamic(() => import('shaka-player-react'), { ssr: false });
import 'shaka-player/dist/controls.css';

function handleTyleClick () {
   return null;
}


import {startBoard, wonBoard, twoMatching, twoMisMatching, oneSelected, twoMatchedNext} from '../components/boards';

export default function Instructions () {
   return (
      <Container fluid>
         <BsCard className={styles.BsCardStyle}>
            <div className={styles.desktopMaxWidth}>
               <p className={styles.instructionP}>
                  The board is made up of pairs of pictures, or Tyles as we call them, like this :
               </p>
               <MtRow>
                  <CardTable
                     board={wonBoard}
                     Card={Card}
                     handleTyleClick={handleTyleClick}
                     numCards={12}
                  />
               </MtRow>
               <p className={styles.instructionP}>
                  At the start of the game the board has all Tyles turned over, showing the jigsaw image :
               </p>
               <MtRow>
                  <CardTable
                     board={startBoard}
                     Card={Card}
                     handleTyleClick={handleTyleClick}
                     numCards={12}
                  />
               </MtRow>

               <p className={styles.instructionP}>
                  The game is to turn over pairs of Tyles, by clicking on the
                  Jigsaw pictures, to find the matching ones, like this :
               </p>
               <MtRow>
                  <CardTable
                     board={twoMatching}
                     Card={Card}
                     handleTyleClick={handleTyleClick}
                     numCards={12}
                  />
               </MtRow>

               <p className={styles.instructionP}>
                  Only two Tyles can be turned over at any one time, clicking on any more will
                  not do anything.
               </p>

               <p className={styles.instructionP}>
                  If your two Tyles do not match ...
               </p>
               <MtRow>
                  <CardTable
                     board={twoMisMatching}
                     Card={Card}
                     handleTyleClick={handleTyleClick}
                     numCards={12}
                  />
               </MtRow>

               <p className={styles.instructionP}>
                  ...you can turn either one (or both) back over by clicking on it (them) again  (just
                  the envelope here) :
               </p>
               <MtRow>
                  <CardTable
                     board={oneSelected}
                     Card={Card}
                     handleTyleClick={handleTyleClick}
                     numCards={12}
                  />
               </MtRow>

               <p className={styles.instructionP}>
                  If your two Tyles match, then they become a bit opaque and you can select then two more Tyles : 
               </p>
               <MtRow>
                  <CardTable
                     board={twoMatchedNext}
                     Card={Card}
                     handleTyleClick={handleTyleClick}
                     numCards={12}
                  />
               </MtRow>

               <p className={styles.instructionP}>
                  When all Tyles are matched, you have won the game!
               </p>
               <MtRow>
                  <CardTable
                     board={wonBoard}
                     Card={Card}
                     handleTyleClick={handleTyleClick}
                     numCards={12}
                  />
               </MtRow>

               <p className={styles.instructionP}>
                  You can change the number of Tyles on the board with the selector under the game.  We have
                  started you on 12, but you can select 4 (easy!), 12, 16, 20, 36, 42 or if you are
                  feeling brave, 56.
               </p>

               <p className={styles.instructionP}>
                  You can restart the game using the Clear Board button at the top :
               </p>
               <img className={styles.imgFluid} src="/img/clearBoardButton.png" />

               <p className={styles.instructionP}>
                  Your scores are in the Past Scores section.  They are saved in Cookies, so no scores are
                  recorded by us.
               </p>
               <p className={styles.instructionP}>
                  Good luck!
               </p>
               <p className={styles.instructionP}>
                  Here is a video showing a game being played.
               </p>
               <ShakaPlayer src="/video/DemoVideo.mpd" />
            </div>
         </BsCard>
      </Container>
   );
}


