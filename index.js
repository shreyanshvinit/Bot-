const Telegraf = require('telegraf')
const axios = require('axios')
require('dotenv').config()

const bot = new Telegraf(process.env.TOKEN_TESTBOT)
console.log(process.env.TOKEN_TESTBOT)

bot.start((ctx) => {
    ctx.reply("The bot has started!")
})

bot.help((ctx) => {
    ctx.reply("I am always ready to help u! Type '/jobs' to know the task performed by me.")
})

bot.command('jobs', (ctx)=>{
    ctx.reply( `I can :
    1. Tell fortune (/fortune)
    2. Give info. about dev-talks (/DevTalks)
    3. Display github actions (/ghactions)` )
})

bot.command('fortune', (ctx)=>{
    url = "http://yerkee.com/api/fortune"
    axios.get(url)
    .then((res)=>{
        ctx.reply(res.data.fortune)
    })
})

bot.command('DevTalks', ctx => {
    
    url = "https://api.github.com/repos/COPS-IITBHU/DevTalks/issues"
    axios.get(url)
    .then(res => {
        if(res.data.length == 0) {
            ctx.reply('No Dev-Talks scheduled');
        }
        
        const info = res.data.map(
            (element) => `[${element.title}](${element.html_url}) by [${element.user.login}](${element.user.html_url})`
        )

        ctx.telegram.sendMessage(ctx.chat.id,info.join('\n\n'),{parse_mode:'Markdown'})
    })
})

bot.launch();
