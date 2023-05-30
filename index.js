console.log("starded...")
const {Telegraf} = require("telegraf")
require('dotenv').config()

const {TOKEN} = process.env


bot = new Telegraf(TOKEN)
bot.start((ctx) => ctx.reply('Добро пожаливать в бота которий даёш мне букви я из них делаю слова (и длину слова из этих букв например(ток 3))'));
bot.on('text', (ctx) =>{

});
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));