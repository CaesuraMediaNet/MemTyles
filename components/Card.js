// A Tyle aka Card, an image from FontAwesome
//
import { useState }        from 'react';
import { useEffect }       from 'react';
import { useRef }          from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPuzzlePiece }   from '@fortawesome/free-solid-svg-icons'
import styles              from '../styles/memtyles.module.css';

export default function Card ({id, icon, width, height, clicked, flipped, won, colour, cardName}) {

   // Next.js CSS Modules come in as classes, here we want CSS styles, not classNames.
   //
    let iconStyle = {
        color   : colour,
        padding : "5px",
        height  : "100%",
        width   : "100%",
    }
    let blankStyle         = {...iconStyle, color   : "dimgray"};
    // Was : let selectedStyle      = {...iconStyle, border  : "1px solid green", borderRadius : "0.2rem",};
    let selectedStyle      = {...iconStyle};
    let wonStyle           = {...iconStyle, opacity : 0.6};

    // Some icons are bigger than others moving the page about.
    //
    let reduceSelectedBigIconStyle = {...selectedStyle, width : "75%"};
    let reduceWonBigIconStyle      = {...wonStyle,      width : "75%"};
    if (cardName.match (/Moon|Brush|Lemon|Bell|HourglassStart/i)) {
        selectedStyle = reduceSelectedBigIconStyle;
      wonStyle      = reduceWonBigIconStyle;
    }
    return (
        <div className={flipped ? styles.cardStyleFlipped : styles.cardStyle} onClick={clicked} >
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

