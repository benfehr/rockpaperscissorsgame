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