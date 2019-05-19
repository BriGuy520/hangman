const displayQuote = document.querySelector('.quote');
const displayhAuthor = document.querySelector('.author');

const url = `http://quotes.rest/qod.json?category=management`;

// setting up the hangman canvas
function draw(){
    const canvas = document.getElementById('hangman');
    const ctx = canvas.getContext('2d');

    const podium = 'rgb(204, 102, 0)';
    const rope = 'white';

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
    ctx.stokeStyle = podium;
    ctx.moveTo(140, 20);
    ctx.lineTo(140, 40);
    ctx.stroke();

}

// this will append each letter from the quote to the dom
function createNode(element){
    let newNode = document.createElement('p')
    let htmlElement = document.body.appendChild(newNode);
    htmlElement.innerHTML = element;
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
            return createNode(char);
        });

        return showAuthor(author);

        
    })
    .catch((err) => {
        console.log(err);
    });


