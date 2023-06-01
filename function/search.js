const itertools = require('itertools')

const words_ru = require('../speech/words_Russian')
const words_en = require('../speech/english_words');


function search(chars, length,callback,lang="ru") {
  const letters = chars.split('');
  const combinations = itertools.permutations(letters, length);
  const foundWords = [];

  for (const combination of combinations) {
    const word = combination.join('');
    let words = lang=="ru" ? words_ru : words_en
    if (words.includes(word)) {
      foundWords.push(word)
    }
  }

  let uniqueWords = [...new Set(foundWords)];

  uniqueWords = (uniqueWords.length>0)?uniqueWords = String(uniqueWords):uniqueWords = "not found!"
 
  callback(uniqueWords)
}
module.exports = search