// The main board used for the game and more demo/instruction boards.
//
import shuffleCards from '../functions/shuffleCards';
import {
   faUserSecret,
   faQuestion,
   faEnvelope,
   faRocket,
   faHippo,
   faUmbrella,
   faGift,
   faLemon,
   faBrush,
   faMagicWandSparkles,
   faBell,
   faBarcode,
   faKey,
   faPaintRoller,
   faBicycle,
   faFeather,
   faBinoculars,
   faShirt,
   faCarSide,
   faMountainSun,
   faHourglassStart,
   faStore,
   faMoon,
   faHotel,
   faWrench,
   faTrophy,
   faMotorcycle,
   faRadio,
   faDragon,
   faScroll,
   faPuzzlePiece,
} from '@fortawesome/free-solid-svg-icons'

export const initBoard = [
   {id : 0,   icon : faEnvelope,          cardName : "Envelope,",         flipped : false, won : false},
   {id : 1,   icon : faHippo,             cardName : "Hippo",             flipped : false, won : false},
   {id : 2,   icon : faUmbrella,          cardName : "Umbrella",          flipped : false, won : false},
   {id : 3,   icon : faGift,              cardName : "Gift",              flipped : false, won : false},
   {id : 4,   icon : faRocket,            cardName : "Rocket",            flipped : false, won : false},
   {id : 5,   icon : faLemon,             cardName : "Lemon",             flipped : false, won : false},
   {id : 6,   icon : faBrush,             cardName : "Brush",             flipped : false, won : false},
   {id : 7,   icon : faMagicWandSparkles, cardName : "MagicWandSparkles", flipped : false, won : false},
   {id : 8,   icon : faBell,              cardName : "Bell",              flipped : false, won : false},
   {id : 9,   icon : faBarcode,           cardName : "Barcode",           flipped : false, won : false},
   {id : 10,  icon : faKey,               cardName : "Key",               flipped : false, won : false},
   {id : 11,  icon : faPaintRoller,       cardName : "PaintRoller",       flipped : false, won : false},
   {id : 12,  icon : faBicycle,           cardName : "Bicycle",           flipped : false, won : false},
   {id : 13,  icon : faFeather,           cardName : "Feather",           flipped : false, won : false},
   {id : 14,  icon : faBinoculars,        cardName : "Binoculars",        flipped : false, won : false},
   {id : 15,  icon : faShirt,             cardName : "Shirt",             flipped : false, won : false},
   {id : 16,  icon : faCarSide,           cardName : "CarSide",           flipped : false, won : false},
   {id : 17,  icon : faMountainSun,       cardName : "MountainSun",       flipped : false, won : false},
   {id : 18,  icon : faHourglassStart,    cardName : "HourglassStart",    flipped : false, won : false},
   {id : 19,  icon : faStore,             cardName : "Store",             flipped : false, won : false},
   {id : 20,  icon : faMoon,              cardName : "Moon",              flipped : false, won : false},
   {id : 21,  icon : faHotel,             cardName : "Hotel",             flipped : false, won : false},
   {id : 22,  icon : faWrench,            cardName : "Wrench",            flipped : false, won : false},
   {id : 23,  icon : faTrophy,            cardName : "Trophy",            flipped : false, won : false},
   {id : 24,  icon : faMotorcycle,        cardName : "Motorcycle",        flipped : false, won : false},
   {id : 25,  icon : faRadio,             cardName : "Radio",             flipped : false, won : false},
   {id : 26,  icon : faDragon,            cardName : "Dragon",            flipped : false, won : false},
   {id : 27,  icon : faScroll,            cardName : "Scroll,",           flipped : false, won : false},
];

// For the instructions, instead of using screenshots, use the real thing.
// Using slice() to make copies so they don't affect each other.
//
export const startBoard     = shuffleCards(initBoard.slice(), 12, true);
export const wonBoard       = startBoard.slice().map((card) => ({...card, won : true}));
export const twoMatching    = startBoard.slice().map((card) => ({...card, won : card.icon === faRocket ? true : false}));

// Two mismatching - there are two of each, so we only need to set one of each, rocket and one envelope.
//
let seenRocket   = false;
let seenEnvelope = false;
export const twoMisMatching = startBoard.slice().map((card, index) => {
   if (
      (seenRocket && card.icon === faRocket)
      ||
      (seenEnvelope && card.icon === faEnvelope)
   ) {
      return {...card};
   } else {
      let newCard = {
         ...card,
         flipped : (card.icon === faRocket && !seenRocket) || (card.icon === faEnvelope && !seenEnvelope) ? true : false
      }
      if (card.icon === faRocket  ) seenRocket  = true;
      if (card.icon === faEnvelope) seenEnvelope = true;
      return newCard;
   }
});

// Just one selected, the first rokcet.
//
let justOneSeen = false;
export const oneSelected    = startBoard.slice().map((card) => {
   if (justOneSeen) {
      return ({...card});
   } else {
      let newCard = {...card, flipped : card.icon === faRocket ? true : false};
      justOneSeen = card.icon === faRocket;
      return newCard;
   }
   
});

// Two won, two mismatched ones selected
//
let seenHippo    = false;
let seenUmbrella = false;
export const twoMatchedNext = twoMatching.slice().map((card) => {
   if (card.icon === faHippo || card.icon === faUmbrella) {
      let newCard = 
      {
            ...card,
            flipped : (!seenHippo && card.icon === faHippo) || (!seenUmbrella && card.icon === faUmbrella)
        };
      if (card.icon === faHippo) seenHippo       = true;
      if (card.icon === faUmbrella) seenUmbrella = true;
      return newCard;
   } else {
      return ({...card});
   }
});
