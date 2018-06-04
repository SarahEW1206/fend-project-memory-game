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

//Shuffle cards Array
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



 const cardList = document.querySelectorAll('.card')
 const cardListArray = Array.from(cardList);
 let openCards = [];
 let matchedCards = [];


 function revealSymbol (el) {
  el.classList.add('show', 'open')
}

function addToOpen (el) {
  openCards.push(el);
}

function matching () {
 openCards[0].classList.add('match');
 openCards[1].classList.add('match');
 matchedCards.push(openCards[0]);
 matchedCards.push(openCards[1]);
 openCards.splice(0, 2);
 console.log(openCards);
}

function noMatch () {
 openCards[0].classList.remove('show', 'open');
 openCards[1].classList.remove('show', 'open');
 openCards.splice(0, 2);
}


cardListArray.forEach(function (card) {

  function checker () {

   if (openCards.length < 2 && !card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') ) {
     revealSymbol(card);
     addToOpen(card);
     console.log(openCards)
   }

   if (openCards.length === 2) {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      matching();

    } else {
      setTimeout(noMatch, 600);
    }


  }

}

  card.addEventListener('click', checker);



})





