const container = document.querySelector(".quote-container");
const quote = document.querySelector("#quote");
const author = document.querySelector("#author");
const twitterButton = document.querySelector("#twitter");
const newQuoteButton = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

function showLoader() {
  loader.hidden = false;
  container.hidden = true;
}

function removeLoader() {
  loader.hidden = true;
  container.hidden = false;
}

// get quote from api

async function getQuote() {
  showLoader();
  const apiUrl = "https://api.quotable.io/random";
  try {
    const response = await fetch(apiUrl);
    let quoteData = await response.json();
    if (response.ok) {
      if (quoteData.content.length > 100) {
        quote.classList.add("long-quote");
      } else quote.classList.remove("long-qoute");
      quote.textContent = quoteData.content;
      author.textContent = "- " + quoteData.author;
      removeLoader();
    } else {
      quote.textContent = "An error occured";
      author.textContent = "";
    }
  } catch (error) {
    getQuote();
  }
}

function tweet() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} ${author.textContent}`;
  window.open(twitterUrl,"_blank");
}

// buttons

newQuoteButton.addEventListener("click",getQuote);
twitterButton.addEventListener("click", tweet);

getQuote();
