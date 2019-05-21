const displayQuote = document.querySelector('.quote');
const displayhAuthor = document.querySelector('.author');

const userGuess = document.getElementById('guess');
const submitGuess = document.getElementById('submitGuess');

let wrongGuess = 0;

let regex = /[A-Za-z]/gi;

const url = `http://quotes.rest/qod.json?category=management`;

// setting up the hangman canvas
function draw(){
    const canvas = document.getElementById('hangman');
    const ctx = canvas.getContext('2d');

    const podium = 'rgb(204, 102, 0)';
    const rope = '#ffffff';
    const body = 'red';

    //base
    ctx.beginPath();
    ctx.strokeStyle = podium;
    ctx.moveTo(100, 120)
    ctx.lineTo(10, 120);
    ctx.stroke();

    // pole
    ctx.beginPath();
    ctx.stokeStyle = podium;
    ctx.moveTo(60, 20);
    ctx.lineTo(60, 120);
    ctx.stroke();

    // bar
    ctx.beginPath();
    ctx.stokeStyle = podium;
    ctx.moveTo(140, 20);
    ctx.lineTo(60, 20);
    ctx.stroke(); 

    // rope
    ctx.beginPath();
    ctx.fillStyle = rope;
    ctx.moveTo(140, 20);
    ctx.lineTo(140, 40);
    ctx.stroke();

    if(wrongGuess === 1){
        ctx.beginPath();
        ctx.fillStyle = body;
        ctx.arc(140, 50, 10, 0, 2 * Math.PI);
        ctx.stroke();
    } else if(wrongGuess === 2){
        ctx.beginPath();
        ctx.fillStyle = body;
        ctx.moveTo(140, 60);
        ctx.lineTo(140, 100);
        ctx.stroke();
    } else if(wrongGuess === 3){
        ctx.beginPath();
        ctx.fillStyle = body;
        ctx.moveTo(140, 70);
        ctx.lineTo(120, 80);
        ctx.stroke();
    } else if(wrongGuess === 4){
        ctx.beginPath();
        ctx.fillStyle = body;
        ctx.moveTo(140, 70);
        ctx.lineTo(160, 80);
        ctx.stroke();
    } else if(wrongGuess === 5){
        ctx.beginPath();
        ctx.fillStyle = body;
        ctx.moveTo(140, 100);
        ctx.lineTo(120, 110);
        ctx.stroke();
    } else if(wrongGuess === 6){
        ctx.beginPath();
        ctx.fillStyle = body;
        ctx.moveTo(140, 100);
        ctx.lineTo(160, 110);
        ctx.stroke();
    }
}

submitGuess.addEventListener('click', () => {
    handleGuess(userGuess);
});

function handleGuess(guess){
    console.log(guess.value);
}



// this will append each letter from the quote to the dom
function createNode(element){
    let newNode = document.createElement('span');
    let htmlElement = document.body.appendChild(newNode);
    htmlElement.setAttribute('class', 'letter');
    htmlElement.innerHTML = `<p>${element}</p>`;

    if(element === " "){
        htmlElement.style.borderBottom = 'none';
    }

    if(element.search(regex) === -1){
        htmlElement.style.borderBottom = 'none';
        htmlElement.style.visibility = 'visible';
    }
}

function showAuthor(name){
    let authorNode = document.createElement('p');
    let appendAuthor = document.body.appendChild(authorNode);
    appendAuthor.setAttribute('class', 'author')
    appendAuthor.innerHTML = "- " + name;
}


// this will be our promise to get our quote from the API
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const quote = data.contents.quotes[0].quote;
        const author = data.contents.quotes[0].author;

        quote.split('').forEach(char => {
            // call the createNode function from line 6
            createNode(char);
        });
        
        showAuthor(author);     
    })
    .catch((err) => {
        console.log(err);
    });


