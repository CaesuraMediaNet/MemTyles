import React from 'react';
// Shuffle only the images, not the ids as they match the arrary indeces.
// Shuffle the whole thing first then set the ids.
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// AKJC TODO : Randomise the cards first, then double up, then random again.
//

const colours = [
    "#622569",
    "#d96459",
    "#e06377",
    "#667292",
    "#87bdd8",
    "#c1502e",
    "#4f3222",
    "#77a8a8",
    "#3b3a30",
    "#4040a1",
    "#36486b",
    "#50394c",
    "#034f84",
    "#b1cbbb",
    "#405d27",
    "#3e4444",
    "#eca1a6",
    "#d64161",
    "#6b5b95",
    "#c83349",
    "#563f46",
    "#8000FF",
    "#FF0080",
    "#C21460",
    "#66B032",
    "#347C98",
    "#4424D6",
    "#FC600A",
];

export function randomise (cards) {

  let currentIndex = cards.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
  }
  // Ids in order. A for (let i ...) loop setting cards[i].id = i does not work.
  // https://stackoverflow.com/questions/39827087/add-key-value-pair-to-all-objects-in-array
  //
  let indexedCards = cards.map((card, index) => ({...card, id : index}));

  return indexedCards;
}

export default function shuffleCards (cards, numCards, noShuffleTwice) {

  // First randomise all known cards, then pick numCards, double them up and randomise them
  // again. So we don't get the same cards each time for each numCards set.
  // Except where we want a defined st of Tyles for the Instructions.
  //
  let randomisedCards = cards;
  if (!noShuffleTwice) {
	  randomisedCards = randomise (cards);
  }
  let selectedCards   = randomisedCards.slice (0, parseInt (numCards / 2));

  // Add a random colour to the first list.
  //
  let randomColours = [];
  selectedCards.forEach (card => {
      let colour        = colours[Math.floor(Math.random() * (colours.length - 1))];
      randomColours.push (colour);
  });
  selectedCards     = selectedCards.map((card, index) => ({...card, colour : randomColours[index]}));
  let doubledUp     = [...selectedCards, ...selectedCards];
  let doubledUpR    = randomise (doubledUp);

  return doubledUpR;
}
