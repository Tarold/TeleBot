const Telegraf = require("telegraf").Telegraf;
const os = require("node:os");
const TOKEN =  "1495800116:AAHZWhlvTEvK91YMH47ta8yHAaKYFHH-zoM";
const bot = new Telegraf(TOKEN);

let serverData = {};
let serverDate = "";

function getDate(){
    var date = new Date();

    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    date = yyyy + '-' + mm + '-' + dd;
    return date;
}

async function getDataFromServer(forceFetch=false){
    if (!forceFetch){
        return 
    }
    return fetch("https://russianwarship.rip/api/v1/statistics/latest",{
        method:"get",
        headers:{'Content-Type': 'application/json'}
    })
        .then(response => response.json())
        .then(data => {
                serverData = data
                serverDate = serverData.data.date
            })
            .catch((er) => {
                console.log("Error ${er}")
            })
}

bot.start(ctx =>{
    ctx.replyWithHTML("Hihi", {
        reply_markup:{
            inline_keyboard: [
                [{text : "Resource", url: "https://russianwarship.rip/"}],
                [{text : "getAll", callback_data: "getAll"}],
            ]
        }
    });
});
bot.action("getAll", ctx =>{
    kindOfStatistic = "stats"
    ctx.reply("PLease enter a kind of statistic ")
})
bot.hears(/Привіт/i, ctx=> {
    ctx.reply("\u{1F600}");
});

bot.hears(/[A-Z]+/i,async ctx=> {
    let message = ctx.message.text;
    await getDataFromServer(serverDate != getDate())
    ctx.reply(message +": " +serverData.data.stats[message])
})

bot.launch(); 