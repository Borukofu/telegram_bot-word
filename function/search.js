const itertools = require('itertools')

const words_ru = require('../speech/words_Russian')
const words_en = require('../speech/english_words')


function search(chars, length,ctx) {
    const letters = chars.split('');
    const combinations = itertools.permutations(letters, length);
    const foundWords = [];
  
    for (const combination of combinations) {
      const word = combination.join('');
      if (words_ru.includes(word)) {
        foundWords.push(word)
      }
    }
    const uniqueWords = [...new Set(foundWords)];
    if (foundWords.length > 0) {
      return String(uniqueWords);
    } else {
      ctx.replyWithSticker(sticker['none']);
      return "not found!"
    }
  }
module.exports = search