const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// shows loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hides loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// show new quote
function newQuote(){
    loading();
    // picks a random quote from the apiquotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank and replace it with unknown
    if (!quote.author){
        authorText.textContent = 'Unknown';
    }
    else {
        authorText.textContent = quote.author;
    }

    // checks quote length to decide what styling to use
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('long-quote');
    }
    // set the quote, and hide the loader
    quoteText.textContent = quote.text;
    complete();
}


// Get quptes from API
async function getQuotes(){
    loading();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } 

    catch (error){
        // catch error here
    }
}

// tweet
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// on load
getQuotes();
