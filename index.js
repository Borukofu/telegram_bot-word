const {Telegraf } = require("telegraf")
const mesagge_on = require('./function/bot')
const text_and_sticker = require("./config/text_and_sticker")

require('dotenv').config(
  {
    path:'./config/.env',
  }
)

const {TOKEN} = process.env
bot = new Telegraf(TOKEN);

bot.start((ctx) => ctx.reply(text_and_sticker.text.start));
bot.on('message', ctx=>{mesagge_on(ctx)});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));