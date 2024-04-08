// declaration
const cards = document.querySelectorAll(".card");
const message = document.getElementById("message");
let matchedPairs = 0;
let cardOne, cardTwo;
let disableDeck = false;

// flipping the card
function flipCard(e) {
  const clickedCard = e.currentTarget;

  if (clickedCard === cardOne || disableDeck) return;

  clickedCard.classList.add("flip");

  if (!cardOne) {
    cardOne = clickedCard;
    return;
  }

  cardTwo = clickedCard;
  disableDeck = true;

  let cardOneImg = cardOne.querySelector(".back-view").style.backgroundImage;
  let cardTwoImg = cardTwo.querySelector(".back-view").style.backgroundImage;

  matchCards(cardOneImg, cardTwoImg);
}

// match cards
function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedPairs++;

    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);

    if (matchedPairs === 1) {
      document.body.className = "winner";

      message.innerHTML = `
      <span class="congrats">Congratulations!</span><br>
`;
      return;
    }

    resetCards();
  } else {
    setTimeout(() => {
      cardOne.classList.remove("flip");
      cardTwo.classList.remove("flip");
      resetCards();
    }, 1000);
  }
}

// reset cards
function resetCards() {
  cardOne = null;
  cardTwo = null;
  disableDeck = false;
}

// shuffle
function shuffleCards() {
  let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let frontView = card.querySelector(".front-view");
    let backView = card.querySelector(".back-view");

    backView.style.backgroundImage = `url('images/img-${arr[i]}.png')`;
    frontView.style.backgroundImage = `url('./images/question.png')`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCards();
