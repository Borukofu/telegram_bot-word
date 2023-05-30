console.log("starded...")
const {Telegraf } = require("telegraf")
const itertools = require('itertools')
const words = require('./words_Russian')
require('dotenv').config()
const {TOKEN} = process.env
let matches_text,matches_digit

const sticker = {
    "none":"CAACAgIAAxkBAANZZHYNidyc28P-VXvTfSVxeyfKyCUAAt8wAAKZ1ahLE_oF5Epyh28vBA",
    "activation":"CAACAgIAAxkBAANSZHYKO_KyBsiMCvEVnDhKY_Dd_y8AAjsvAAK_TqlLioexq4CLvXMvBA"
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
//console.log(search("ток",3))

bot = new Telegraf(TOKEN)
bot.start((ctx) => ctx.reply('Добро пожаливать в бота которий даёш мне букви я из них делаю слова (и длину слова из этих букв например(ток 3))'));
//bot.on('message', async (ctx) => {
//    await ctx.replyWithSticker(sticker['none']);
//})
bot.on('message',async (ctx) =>{
    try{
        texts = ctx.message.text
        matches_text = await texts.match(/\p{L}/gu);
        matches_digit = await texts.match(/\p{N}/gu);
        console.log(matches_text.join(""),matches_digit.join(""))
        if (matches_text!=null && matches_digit!=null) {
            ctx.replyWithSticker(sticker['activation'])
            setTimeout(()=>{ctx.reply(search(matches_text.join(""),matches_digit.join(""),ctx))},2500)
    }}catch(err){
        console.error(err)
    }
});
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));