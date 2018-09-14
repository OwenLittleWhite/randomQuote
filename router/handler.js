const quotes = require('../db/quotes.json')

exports.getRandomQuote = (args, res) => {
  let len = quotes.length
  let randomIndex = parseInt(Math.random() * (len - 1))
  let randomQuote = quotes[randomIndex]
  res.json({
    author: randomQuote.author,
    quote: randomQuote.text
  })
}
