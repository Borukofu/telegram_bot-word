console.log("starded...")
const {Telegraf} = require("telegraf")
const itertools = require('itertools')
const words = require('./words_Russian')
require('dotenv').config()
const {TOKEN} = process.env
let matches_text,matches_digit

function search(chars, length) {
  const letters = chars.split('');
  const combinations = itertools.permutations(letters, length);
  const foundWords = [];

  for (const combination of combinations) {
    const word = combination.join('');
    if (words.includes(word)) {
      foundWords.push(word)
    }
  }

  if (foundWords.length > 0) {
    return String(foundWords);
  } else {
    return "not";
  }
}
//console.log(search("ток",3))

bot = new Telegraf(TOKEN)
bot.start((ctx) => ctx.reply('Добро пожаливать в бота которий даёш мне букви я из них делаю слова (и длину слова из этих букв например(ток 3))'));
bot.on('text',async (ctx) =>{
    try{
        texts = ctx.message.text
        matches_text = await texts.match(/\p{L}/gu);
        matches_digit = await texts.match(/\p{N}/gu);
        console.log(matches_text.join(""),matches_digit.join(""))
        if (matches_text!=null && matches_digit!=null) {
            ctx.reply(search(matches_text.join(""),matches_digit.join("")))
    }}catch(err){
        console.error(err)
    }
});
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));