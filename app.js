const displayQuote = document.querySelector('.quote');
const url = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

fetch(url)
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });


