// Challenge 1: Your Age in Days

ageInDays = () => {
    var birthYear = prompt('What year were you born... Good friend?');
    var ageInDayss = (2020 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode(`You are ${ageInDayss} days old.`);
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

reset = () => {
    document.getElementById('ageInDays').remove();
}

// Challenge 2: Cat Generator
generateCat = () => {
    var image = document.createElement("img");
    var div = document.getElementById("flex-cat-gen");
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

// Challenge 3: Rock, Paper, Scissors
rpsGame = (yourChoice) => {
    console.log(yourChoice.id);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;

    botChoice = numberToChoice(randToRpsInt());
    console.log('Computer choice:', botChoice);

    results = decideWinner(humanChoice, botChoice) // [1, 0] human won | bot lost
    console.log(results);

    message = finalMessage(results); // {'message': 'You won!', 'color': 'green'}
    console.log(message);

    rpsFrontEnd(yourChoice.id, botChoice, message);
}

randToRpsInt = () => {
    return Math.floor(Math.random() * 3);
}

numberToChoice = (number) => {
    return ['rock', 'paper', 'scissors'][number]
}

decideWinner = (yourChoice, computerChoice) => {
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'scissors': 0, 'rock': 1, 'paper': 0.5},
        'scissors': {'scissors': 0.5, 'rock': 0, 'paper': 1}
    }

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = 1 - yourScore;

    return [yourScore, computerScore];
}

finalMessage = ([yourScore, computerScore]) => {
    if (yourScore == 0) {
        return {'message': 'You lost!', 'color': 'red'}
    } else if (yourScore == 1) {
        return {'message': 'You won!', 'color': 'green'}
    } else {
        return {'message': 'You tied!', 'color': 'yellow'}
    }
}

rpsFrontEnd = (humanImageChoice, botImageChoice, finalMessage) => {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = `<img src='${imagesDatabase[humanImageChoice]}' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>`;
    messageDiv.innerHTML = `<h1 style='color: ${finalMessage['color']}; font-size: 60px; padding: 30px;'>${finalMessage['message']}</h1>`;
    botDiv.innerHTML = `<img src='${imagesDatabase[botImageChoice]}' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>`;

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}


// Challenge 4: Change the Color of All Buttons

var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];
for(button of all_buttons){
    copyAllButtons.push(button.classList[1]);
}

buttonColorChange = (buttonThingy) =>  {
    switch(buttonThingy.value){
        case 'red':
            buttonsSetColor('red');
            break;
        case 'green':
            buttonsSetColor('green');
            break;
        case 'reset':
            buttonColorReset();
            break;
        default:
            randomColors();
    }
}

buttonsSetColor = (color) => {
    let colDict = {'red': 'btn-danger', 'green': 'btn-success'};
    for(button of all_buttons){
        button.classList.remove(button.classList[1]);
        button.classList.add(colDict[color]);
    }
}

buttonColorReset = () => {
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

randomColors = () => {
    let colors = ['btn-primary','btn-danger','btn-warning','btn-success'];
    for(button of all_buttons){
        button.classList.remove(button.classList[1]);
        button.classList.add(colors[Math.floor(Math.random() * 4)]);
    }
}


// Challenge 5: Blackjack
let blackjackGame = {
    'you' : {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]},
    'wins': 0,
    'draws': 0,
    'losses': 0,
    'isStand': false,
    'turnsOver': false,
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

blackjackHit = () => {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

randomCard = () => {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

showCard = (card, activePlayer) => {
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

blackjackDeal = () => {
    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
        for(image of yourImages){
            image.remove();
        }
    
        for(image of dealerImages){
            image.remove();
        }
    
        YOU['score'] = 0;
        DEALER['score'] = 0;
    
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
    
        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff'
    
        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true;
    }
}

updateScore = (card, activePlayer) => {
    // If adding 11 keeps me below 21, add 11, otherwise add 1
    if(card === 'A'){
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
    
}

showScore = (activePlayer) => {
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    blackjackGame['turnsOver'] = true;
    let winner = computerWinner();
    showResult(winner);
}

// computer winner and return who just won
// update the wins, draws and losses
computerWinner = () => {
    let winner;

    if (YOU['score'] <= 21) {
        // condition: higher score than dealer or when dealer busts but you're 21 or under
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }

    // condition: when user busts but dealer doesn't
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;

    // condition: when you AND the dealer busts
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }

    return winner;
}

showResult = (winner) => {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';
        }
    
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }


}

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

