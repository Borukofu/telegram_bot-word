console.log("starded...")
const {Telegraf} = require("telegraf")
require('dotenv').config()

const {TOKEN} = process.env

let matches_text,matches_digit

bot = new Telegraf(TOKEN)
bot.start((ctx) => ctx.reply('Добро пожаливать в бота которий даёш мне букви я из них делаю слова (и длину слова из этих букв например(ток 3))'));
bot.on('text',async (ctx) =>{
    try{
        texts = ctx.message.text
        matches_text = await texts.match(/\p{N}/gu);
        matches_digit = await texts.match(/\p{L}/gu)
        console.log(matches_text.join(""))
        console.log(matches_digit.join(""))
        if (matches_text!=null && matches_digit!=null) {
            console.log("!=")
    }}catch(err){
        console.error(err)
    }
});
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));