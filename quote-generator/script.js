const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const tweetButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Get Quotes From API
async function getQuote() {
  showLoadingSpinner();
  const link = 'https://api.quotable.io/quotes/random';
  try {
    const response = await fetch(link);
    const data = await response.json();
    // If Author is blank, add "Unknown"
    if (data[0].author === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data[0].author;
    }
    // Reduce font size for long quotes
    if (data[0].content.length > 50) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data[0].content;
    // stop loader, show quote
    removeLoadingSpinner();
  } catch (error) {
    // Catch Error here
    getQuote();
    console.log('whoops, no quote', error);
  }
}
// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteButton.addEventListener('click', getQuote);
tweetButton.addEventListener('click', tweetQuote);

// On Load
getQuote();
