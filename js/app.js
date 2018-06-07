/*
 * Create a list that holds all of your cards
 */

 let cards = [
 "fa fa-diamond",
 "fa fa-diamond",
 "fa fa-paper-plane-o",
 "fa fa-paper-plane-o",
 "fa fa-anchor",
 "fa fa-anchor",
 "fa fa-bolt",
 "fa fa-bolt",
 "fa fa-leaf",
 "fa fa-leaf",
 "fa fa-bicycle",
 "fa fa-bicycle",
 "fa fa-bomb",
 "fa fa-bomb",
 "fa fa-cube",
 "fa fa-cube"
 ]

//Get the deck, which is the ul that holds the cards as li's
const deck = document.querySelector('.deck');



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Shuffle the cards Array - i.e. shuffle the order of the symbols
shuffle(cards);

//For each element in the cards array, create a list item with the class "card" and the respective symbol as it's HTML, then append the li to the "deck" ul.
for (let i=0; i<cards.length; i++) {

  const li = document.createElement('li');
  const symbol = cards[i];

  li.classList.add('card');
  li.innerHTML = `<i class = "${symbol}">`;

  deck.appendChild(li);

}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



//Get a list of all the cards (from current layout)
 const cardList = document.querySelectorAll('.card')
//Convert DOM List of cards to Array
 const cardListArray = Array.from(cardList);
//Make an Array to hold the open (aka flipped) cards
 let openCards = [];
//Make an Array to hold the matched cards
 let matchedCards = [];
//Start moves counter at 0
 let moves = 0

//Add class that will change the color when flipped and show the symbol
 function revealSymbol(el) {
  el.classList.add('show', 'open')
}

//Add flipped cards to the openCards Array
function addToOpen(el) {
  openCards.push(el);
}

//If all cards are matched, show a message with the final score.
function youWin() {
  if (matchedCards.length === 16) {    
    document.querySelector('.victoryMessage').innerHTML = "YOU WIN"
  }
}

//If the cards match, add match class and push to matchedCards array. Clear out the openCards array for next set of moves.
function matching() {
 openCards[0].classList.add('match');
 openCards[1].classList.add('match');
 matchedCards.push(openCards[0]);
 matchedCards.push(openCards[1]);
 openCards.splice(0, 2);
 //Run youWin function to see if matchedCards array is full, i.e. game is complete. 
 youWin();
}

//If they don't match, remove the open class and symbol (flip them back over) and remove them from the open cards array.
function noMatch() {
 openCards[0].classList.remove('show', 'open');
 openCards[1].classList.remove('show', 'open');
 openCards.splice(0, 2);
}

//Increment the counter with each move (each click) and change the HTML to reflect the total moves.
function counter() {
  moves++;
  document.querySelector('.moves').innerHTML = moves;
}



//Iterate through the array of cards (the shuffled and "dealt" cards) and add an event listener that will run the "checker" function on click.
cardListArray.forEach(function(card) {

  function checker() {
//Check if there is room in the openCards Array (can only hold 2 cards at a time) and that the cards haven't already been flipped or matched (Use classes to verify this)
   if (openCards.length < 2 && !card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') ) {
     //If the card meets the criteria for being added to the openCards Array, run the following functions to "flip" it and increment total moves by 1.
     revealSymbol(card);
     addToOpen(card);
     counter();
   }

//If the openCards Array has 2 cards in it, check to see if they match! If they do, run the matching function. If they don't run the noMatch function.
   if (openCards.length === 2) {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      matching();

    } else {
      //Had to use setTimeout to keep the 2nd of 2 non-matching cards from flipping back over instantaneously.
      setTimeout(noMatch, 600);
    }

  }
}

card.addEventListener('click', checker);



})













