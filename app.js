const displayQuote = document.querySelector('.quote');
const url = `http://quotes.rest/qod.json?category=management`;



fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const quote = data.contents.quotes[0].quote;
    })
    .catch((err) => {
        console.log(err);
    });


