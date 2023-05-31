const search = require("./search");
const text_and_sticker = require('../config/text_and_sticker')

async function mesagge_on(ctx){
    try{
        let texts = await ctx.message.text.toLowerCase();

        let matches_text = await texts.match(/\p{L}/gui);
        let matches_digit = await texts.match(/\p{N}/gui);

        if (matches_text!=null && matches_digit!=null) {
            ctx.reply(search(matches_text.join(""),matches_digit.join(""),ctx));
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
module.exports = mesagge_on