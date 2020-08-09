const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, args) => {

    if(!message.content.startsWith('rpg!'))return;  
    let user = message.mentions.members.first() || message.author;

    let embed = new Discord.RichEmbed()
    .setColor('#FFFFF1')
    .setTitle(`♦️ Все доступные на данный момент команды разработчика ♦️`)
    .addField(`- Все существующие без распределения:`, `**rpg!givepoints[gp]** - выдача очков характеристики\n**rpg!addxp[axp]** - выдача опыта\n**rpg!damage[dmg]** - нанесение урона\n**rpg!setdefstats[sds]** - сброс всех характеристик и статов\n**rpg!fullheal[fh]** - исцеление до максимума`)

    message.channel.send(embed)

}
module.exports.help = {
  name:"ownerhelp",
  aliases: ["owhelp"]
}