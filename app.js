const displayQuote = document.querySelector('.quote');
const displayhAuthor = document.querySelector('.author');

const userGuess = document.getElementById('guess');
const submitGuess = document.getElementById('submitGuess');
const inner = document.getElementsByClassName('inner');
const resetGame = document.getElementById('resetGame');

const canvas = document.getElementById('hangman');
const ctx = canvas.getContext('2d');

const regex = /[A-Za-z]/gi;

let wrongGuess = 0;

const url = `http://quotes.rest/qod.json?category=management`;

// this will be our promise to get our quote from the API
function apiCall(url){
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const quote = data.contents.quotes[0].quote;
        const author = data.contents.quotes[0].author;
    
        createBoard(quote);
        showAuthor(author);
    })
    .catch((err) => {
        console.log(err);
    });
}

apiCall(url);

function createBoard(quote){    
    quote.split('').forEach(char => {
        // call the createNode function from line 6
        createNode(char);    
    });
}

// this will append each letter from the quote to the dom
function createNode(element){
    let newNode = document.createElement('span');
    let htmlElement = document.body.appendChild(newNode);
    htmlElement.setAttribute('class', 'letter');
    htmlElement.innerHTML = `<p class="${element} inner">${element}</p>`;

    if(element === " "){
        htmlElement.style.borderBottom = 'none';
    }

    if(element.search(regex) === -1){
        htmlElement.style.borderBottom = 'none';
        htmlElement.childNodes[0].style.visibility = 'visible';
    }
}

function showAuthor(name){
    let authorNode = document.createElement('p');
    let appendAuthor = document.body.appendChild(authorNode);
    appendAuthor.setAttribute('class', 'author')
    appendAuthor.innerHTML = "- " + name;
}

function createHangman(x1, y1, x2, y2, color){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// setting up the hangman canvas
function draw(){
    const podium = 'rgb(204, 102, 0)';
    const rope = '#ffffff';
    const body = 'green';
    
    if(wrongGuess >= 0){
        //base
        createHangman(100, 120, 10, 120, podium);

        // pole
        createHangman(60, 20, 60, 120, podium);

        // bar
        createHangman(140, 20, 60, 20, podium);

        // rope
        createHangman(140, 20, 140, 40, rope);
    }

   
    if(wrongGuess >= 1){
        ctx.beginPath();
        ctx.strokeStyle = body;
        ctx.arc(140, 50, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
    if(wrongGuess >= 2){
        createHangman(140, 60, 140, 100, body);
    } 
    
    if(wrongGuess >= 3){
        createHangman(140, 70, 120, 80, body);
    } 
    
    if(wrongGuess >= 4){
        createHangman(140, 70, 160, 80, body);
    }
    
    if(wrongGuess >= 5){
        createHangman(140, 100, 120, 110, body);
    } 
    
    if(wrongGuess === 6){
        createHangman(140, 100, 160, 110, body);
        resetGame.style.visibility = 'visible';
    }
}

submitGuess.addEventListener('click', () => {
    let letter = document.getElementsByClassName(`${userGuess.value}`);
    let guessInput = document.getElementById('guess');

    if(userGuess.value.length === 1 && letter.length !== 0){
        for(let char of letter){
           char.style.visibility = 'visible';   
        }
    } 

    if(letter.length === 0){
        wrongGuess += 1;
        draw();
    }

    guessInput.value = '';
});

// Reset game if user has been hangmanned
resetGame.addEventListener('click', () => {
    for(let char of inner){
        if(char.style.visibility === 'visible'){
            char.style.visibility = 'hidden';
        }
    }
    resetGame.style.visibility = 'hidden';
    wrongGuess = 0;
    ctx.clearRect(0, 0,  canvas.width, canvas.height);
    draw(); 
});




