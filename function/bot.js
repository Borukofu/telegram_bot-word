const search = require("./search");
const text_and_sticker = require('../config/text_and_sticker')
const { Markup } = require("telegraf")
const data = require('../config/data')

let lang = 'ru'

async function mesagge_on(ctx){
    try{
        let texts = await ctx.message.text.toLowerCase();

        let matches_text = await texts.match(/\p{L}/gui);
        let matches_digit = await texts.match(/\p{N}/gui);
        dats = data.pull()

        for(i in dats){
            if(dats[i][0]==ctx.chat.id){
                lang = dats[i][1]
            
            }
        }
        
        if (matches_text!=null && matches_digit!=null) {
            search(matches_text.join(""),matches_digit.join(""),(found)=>{
                if(found=="not found!"){
                    ctx.replyWithSticker(text_and_sticker.sticker.none)
                }else{
                    ctx.reply(found)
                }
            },lang );
        }else if(matches_digit==null){
            ctx.reply(text_and_sticker.text.not_number);
        }else if(matches_text==null){
            ctx.reply(text_and_sticker.text.not_text);
        }else{
            ctx.replyWithSticker(text_and_sticker.sticker.none);
        }
    }catch(err){
        console.error(err);
}
}


function replace_lang(ctx){
    ctx.reply("ru/en",
        Markup.inlineKeyboard([
            Markup.button.callback("ru","lang_ru"),
            Markup.button.callback("en","lang_en")
        ])
    )
}
module.exports = {
    "replace":replace_lang,
    "message_on":mesagge_on,
}