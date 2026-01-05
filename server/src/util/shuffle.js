const crypto = require('crypto');

function makeDeck(){
  const suits = ['♠','♥','♦','♣'];
  const ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  const deck = [];
  for(const s of suits){
    for(const r of ranks){
      deck.push(`${r}${s}`);
    }
  }
  return deck;
}

function shuffleDeck(){
  const deck = makeDeck();
  // Fisher-Yates with crypto.randomInt
  for(let i = deck.length -1; i>0; i--){
    const j = crypto.randomInt(0, i+1);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

module.exports = { makeDeck, shuffleDeck };
