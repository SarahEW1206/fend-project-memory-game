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
function dealCards() {

  for (let i=0; i<cards.length; i++) {

    const li = document.createElement('li');
    const symbol = cards[i];

    li.classList.add('card');
    li.innerHTML = `<i class = "${symbol}">`;

    deck.appendChild(li);

  }

}

dealCards();


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
let moves = 0;
//Start timer at 0
let seconds = 0;


//Add class that will change the color when flipped and show the symbol
function revealSymbol(el) {
  el.classList.add('show', 'open')
}

//Add flipped cards to the openCards Array
function addToOpen(el) {
  openCards.push(el);
}

const stars = document.querySelector('.stars')

//Increment the counter with each move (each click) and change the HTML to reflect the total moves.
function counter() {

  moves++;
  document.querySelector('.moves').innerHTML = moves;

  if(moves >= 10 && moves < 20 ) {
    stars.innerHTML = `
    <li class='star'><i class='fa fa-star'></i></li>
    <li class='star'><i class='fa fa-star'></i></li>
    <li class='star'><i class='fa fa-star'></i></li>
    <li class='star'><i class='fa fa-star'></i></li>
    `
    ;
  }

  if(moves >= 20 && moves < 30 ) {
    stars.innerHTML = `
    <li class='star'><i class='fa fa-star'></i></li>
    <li class='star'><i class='fa fa-star'></i></li>
    <li class='star'><i class='fa fa-star'></i></li>
    `
    ;
  }

  if(moves >= 30 && moves < 40 ) {
    stars.innerHTML = `
    <li class='star'><i class='fa fa-star'></i></li>
    <li class='star'><i class='fa fa-star'></i></li>
    `
    ;
  }

  if(moves >= 40) {
    stars.innerHTML = `
    <li class='star'><i class='fa fa-star'></i></li>
    `
    ;
  }
}

// Call this function with a 1000ms interval to count seconds.
function timer() {
  //Add conditional so that timer stops when all cards are matched.
  function countSeconds() {
    if (moves !== 0 && matchedCards.length < 16) {
      seconds++;
      document.querySelector('.time').innerHTML = seconds;
    }
  }
  setInterval(countSeconds, 1000);
}

// //call the timer function
timer();


//If all cards are matched, show a message with the final score. (moves and time)
function youWin() {
  if (matchedCards.length === 16) {  
    document.querySelector('.victory-message-box').classList.remove('hide');
    const starRating = stars.innerHTML;
    document.querySelector('.victory-message').innerHTML = `
    <p>You won in ${moves} moves and ${seconds} seconds!!<p>
    <p>Your star rating:</p> 
    <ul class="stars">
    ${starRating}
    </ul>
    `
  }
}

//If the cards match, add match class and push to matchedCards array. Clear out the openCards array for next set of moves.
function matching() {
 openCards[0].classList.add('match');
 openCards[1].classList.add('match');
 matchedCards.push(openCards[0]);
 matchedCards.push(openCards[1]);
 openCards = [];
 //Run youWin function to see if matchedCards array is full, i.e. game is complete. 
 youWin();
}

//If they don't match, remove the open class and symbol (flip them back over) and remove them from the open cards array.
function noMatch() {

  openCards.forEach(function(card) {

    setTimeout(function() {
      card.classList.add('wrong');
    }, 500)

    setTimeout(function() {
      card.classList.remove('show', 'wrong');
    }, 1500)

    setTimeout(function() {
      card.classList.remove('open');
    }, 1600)

    openCards = [];

  })
}





//This is the function that will be called on the click event on the cards. 
function checker(element) {
//Check if there is room in the openCards Array (can only hold 2 cards at a time) and that the cards haven't already been flipped or matched (Use classes to verify this)


//If the card meets the criteria for being added to the openCards Array, run the following functions to "flip" it and increment total moves by 1.
if (openCards.length <= 2 && !element.classList.contains('open') && !element.classList.contains('show') && !element.classList.contains('match') ) {
 revealSymbol(element);
 addToOpen(element);
 counter();
}

//If the openCards Array has 2 cards in it, check to see if they match! If they do, run the matching function. If they don't run the noMatch function.
if (openCards.length === 2) {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    matching();
  } else {
    noMatch();
  }
}

}

//this is the funtion that will be called on load, on clicking reset button and on clicking the play again button. We call checker() inside of here and pass the card as the parameter.
function reset() {

   //If modal is showing, hide the modal when clicked. 
   const modal = document.querySelector('.victory-message-box')
   modal.classList.add('hide');

   //Clear out the matched cards array
   matchedCards = [];

    //Reset stars to five
    stars.innerHTML = `
    <li class='star'><i class='fa fa-star'></i></li>
    <li class='star'><i class='fa fa-star'></i></li>
    <li class='star'><i class='fa fa-star'></i></li>
    <li class='star'><i class='fa fa-star'></i></li>
    <li class='star'><i class='fa fa-star'></i></li>
    `
    ;

  //Reset moves to 0
  moves = 0;
  //Make scoreboard reflect the reset.
  document.querySelector('.moves').innerHTML = moves;

  //Reset timer to 0
  seconds = 0;
  //Make scoreboard reflect the reset.
  document.querySelector('.time').innerHTML = seconds;


  //Empty the deck, reshuffle, redeal the cards.
  deck.innerHTML = "";
  shuffle(cards);
  dealCards();

  //Get a list of the cards in the new deck.
  const newCards = document.querySelectorAll('.card')

  //Iterate throught the new deck of cards
  newCards.forEach(function(card) {
     //remove all the classes so that they are flipped face down.
     card.classList.remove('open', 'show', 'match', 'wrong');
    //Apply the checker function to each card. Had to nest this to protect it from the button hijacking the event listener. There's probably a cleaner way, but, hey it works! The Button still takes on the first listener, and we use that behavior to our advantage by saying, "ok, button, now go ahead and put this 2nd listener on the cards."
    card.addEventListener('click', function(){
      this.addEventListener('click', checker(this))
    })
  })

}


window.addEventListener('load', reset);
document.querySelector('.game-start').addEventListener('click', reset);
document.querySelector('.play-again').addEventListener('click', reset);




