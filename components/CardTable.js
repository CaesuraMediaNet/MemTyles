// Card table of Tyles (aka Cards).
//
export default function CardTable ({board, Card, handleTyleClick, numCards}) {
   return board.map (card => {
         let width = "25%";
         switch (parseInt (numCards)) {
            case 4 :
            case 12 :
            case 16 :
               width = "25%"
               break;
            case 20 :
               width = "20%";
               break;
            case 36 :
               width = "16.6666666666%";
               break;
            case 42 :
               width = "14.285714%";
               break;
            case 56 :
               width = "12.5%";
               break;
            default : 
               width = "25%";
         }
         return (
            <div key={card.id} style={{ width : width }}>
               <Card 
                  key={card.id}
                  id={card.id}
                  icon={card.icon}
                  width={100}
                  height={100}
                  clicked={() => handleTyleClick (card)}
                  flipped={card.flipped}
                  won={card.won}
                  colour={card.colour}
                  cardName={card.cardName}
               />
            </div>
         );
      });
   }
