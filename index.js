const {Telegraf } = require("telegraf")
const bot_function = require('./function/bot')
const text_and_sticker = require("./config/text_and_sticker")
const data = require('./config/data')

require('dotenv').config()

const {TOKEN} = process.env
bot = new Telegraf(TOKEN);

bot.start((ctx) => ctx.reply(text_and_sticker.text.start));
bot.action('lang_ru',ctx=>{
  data.add(ctx.chat.id,"ru",)
  return ctx.answerCbQuery('Langule selected Russian')
})
bot.action('lang_en',ctx=>{
  data.add(ctx.chat.id,"en",)
  return ctx.answerCbQuery('Langule selected English')
})
bot.command('lang', ctx=>{bot_function.replace(ctx)})
bot.on('message', ctx=>{bot_function.message_on(ctx)});


bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));