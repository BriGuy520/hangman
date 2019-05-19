const displayQuote = document.querySelector('.quote');
const url = `http://quotes.rest/qod.json?category=management`;


function createNode(element){
    let newNode = document.createElement('div')
    let htmlElement = document.body.appendChild(newNode);
    htmlElement.innerHTML = element;

}

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const quote = data.contents.quotes[0].quote;

        quote.split('').forEach(char => {
            return createNode(char);
        });
    })
    .catch((err) => {
        console.log(err);
    });


