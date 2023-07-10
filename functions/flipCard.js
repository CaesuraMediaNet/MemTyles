// Flip the card and then see what state the game is in, updatin gthe board and number of clicks.
//
export default function flipCard (card, numClicks, setNumClicks, board, setBoard) {

   setNumClicks (numClicks + 1);

   // Count the number of already flipped cards, and stop if this is the third one.
   //
   let notPoss    = false;
   let won        = false;
   let wonAll     = false;
   if (card.won) {
      notPoss = true;
   } else {
      let numFlipped = 0;
      for (let i=0; i < board.length; i++) {
         let thisCard = board[i];

         // If this card has been clicked, then unflip it, and don't increase the count.
         //
         if (thisCard.flipped && !card.flipped) {
            numFlipped++;
         }
         if (numFlipped > 1) {
            notPoss = true;
            break;
         }
      };
   }
   if (!notPoss) {

      // Change the one element to be flipped
      //
      let newBoard = [];
      board.forEach (thisCard => {
         if (thisCard.id === card.id) {
            newBoard.push ({...card, flipped : !card.flipped});
         } else {
            newBoard.push ({...thisCard});
         }
      });

      // Now see if this flipped card matches any previous one.
      //
      let card1, card2;
      let matches = "";
      for (let i=0; i < newBoard.length; i++) {
         let thisCard = newBoard[i];
         if (thisCard.flipped) {
            if (matches && matches === thisCard.cardName) {
               won   = true;
               card2 = thisCard;
               break;
            } else {
               matches = thisCard.cardName;
               card1   = thisCard;
            }
         }
      }
      if (typeof(card1) !== "undefined" && typeof(card2) !== "undefined") {

         // Set flipped back to false and won to true to leave the square
         // on the board in its place. Same as the one with cards, don't move things
         // about.
         //
         newBoard[card1.id] = {...card1, won : true, flipped : false};
         newBoard[card2.id] = {...card2, won : true, flipped : false};
      }

      // Check for overall winner, all cards won.
      //
      let wonCount =0;
      for (let i=0; i < newBoard.length; i++) {
         if (newBoard[i].won) wonCount++;
      }
      if (wonCount === newBoard.length) {
         wonAll  = true;
      }
      setBoard (newBoard);
   }
   return {won : won, wonAll : wonAll};
}
