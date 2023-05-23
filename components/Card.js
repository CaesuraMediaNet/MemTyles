// A Tyle aka Card, an image from FontAwesome
//
import { useState }        from 'react';
import { useEffect }       from 'react';
import { useRef }          from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPuzzlePiece }   from '@fortawesome/free-solid-svg-icons'

export default function Card ({id, icon, width, height, clicked, flipped, won, colour, cardName}) {
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

