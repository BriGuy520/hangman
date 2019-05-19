const displayQuote = document.querySelector('.quote');
const url = `http://quotes.rest/qod.json?category=management`;


// this will append each letter from the quote to the dom
function createNode(element){
    let newNode = document.createElement('p')
    let htmlElement = document.body.appendChild(newNode);
    htmlElement.innerHTML = element;
}


// this will be our promise to get our quote from the API
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const quote = data.contents.quotes[0].quote;

        quote.split('').forEach(char => {
            // call the createNode function from line 6
            return createNode(char);
        });
    })
    .catch((err) => {
        console.log(err);
    });


