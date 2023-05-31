const {Telegraf } = require("telegraf")
const itertools = require('itertools')
const words = require('./words_Russian')
require('dotenv').config()
const {TOKEN} = process.env

let matches_text,matches_digit
const sticker = {
    "none":"CAACAgIAAxkBAANZZHYNidyc28P-VXvTfSVxeyfKyCUAAt8wAAKZ1ahLE_oF5Epyh28vBA",
}

function search(chars, length,ctx) {
  const letters = chars.split('');
  const combinations = itertools.permutations(letters, length);
  const foundWords = [];

  for (const combination of combinations) {
    const word = combination.join('');
    if (words.includes(word)) {
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

bot = new Telegraf(TOKEN)
bot.start((ctx) => ctx.reply('этот бот создан для игр про слова там где дают тебе буквы а из этих букв надо собрать слово длиной в 3 буквы'));
bot.on('message',async (ctx) =>{
    try{
        texts = await ctx.message.text.toLowerCase()

        matches_text = await texts.match(/\p{L}/gui);
        matches_digit = await texts.match(/\p{N}/gui);

        if (matches_text!=null && matches_digit!=null) {
            ctx.reply(search(matches_text.join(""),matches_digit.join(""),ctx))
        }else{
          ctx.replyWithSticker(sticker['none'])
        }
    }catch(err){
        console.error(err)
    }
});
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));