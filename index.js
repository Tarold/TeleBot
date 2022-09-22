const Telegraf = require("telegraf").Telegraf;
const os = require("node:os");
const TOKEN =  "1495800116:AAHZWhlvTEvK91YMH47ta8yHAaKYFHH-zoM";

const bot = new Telegraf(TOKEN);
bot.start(ctx =>{                                                                                                                                                                                           
});

bot.hears(/Привіт/i, ctx=> {
    ctx.reply("\u{1F600}");                                                                                                                                                                                                              
});

bot.hears(/[A-Z]+/i, ctx=> 
fetch("https://russianwarship.rip/api/v1/statistics/latest",
{
    method:"get",
    headers:{'Content-Type': 'application/json'}
}
)
    .then(response => response.json())
    .then (data =>
        ctx.reply(ctx.message.text + ": " + data.data.stats[ctx.message.text]
        + " + " + data.data.increase[ctx.message.text] + "\nТанків: "
        + data["data"]["stats"]["tanks"] + " + "+data["data"]["increase"]["tanks"] )
    )
);

bot.launch(); 