const buttons = Array.from(document.getElementsByClassName('btn'));
const playerScoreElement = document.getElementById('playerScore');
const computerScoreElement = document.getElementById('computerScore');
const resetButton = document.getElementById('reset');

const hands = [
    {
        name: 'rock',
        beats: 'scissors'
    },
    {
        name: 'paper',
        beats: 'rock'
    },
    {
        name: 'scissors',
        beats: 'paper'
    },
]

let playerScore = 0;
let computerScore = 0;
let gameOverState= false;

for (button of buttons) {
    button.addEventListener('click', (e) => {
        if (!gameOverState) {
            playRound(e.target.dataset['hand'])
        } else {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: "Game over, reset to play again",
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
}

function playRound(playerSelection) {
    const computerHand = getComputerHand()
    const playerHand = hands.find(hand => hand.name === playerSelection)
    evalHands(playerHand, computerHand)
}

function getComputerHand(){
    const computerGuess = Math.floor(Math.random() * hands.length)
    return hands[computerGuess]
}

function evalHands(playerHand, computerHand) {
    if (playerHand === computerHand) {
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: "It's a draw",
            showConfirmButton: false,
            timer: 1500
        })
    } else if (playerHand.beats === computerHand.name) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: "You win!",
            showConfirmButton: false,
            timer: 1500
        })
        playerScore++
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: "Loser",
            showConfirmButton: false,
            timer: 1500
        })
        computerScore++
    }
    updateScore()

    if (playerScore === 5 || computerScore === 5) {
        let winner = playerScore === 5 ? 'you' : 'computer'
        gameOverState(winner)
    }
}



