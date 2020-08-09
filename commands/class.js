const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, args) => {
let user = message.author

if(args[0] == 'Mage'){
    db.set(`class_${message.guild.id}_${user.id}`, "Mage 💠")

    let embed = new Discord.RichEmbed()
    .setColor('#FFFFF0')
    .setFooter(user.username, user.displayAvatarURL)
    .setDescription(`Вы выбрали класс: **Маг**\nУрон класса "**Маг**" основывается на его интеллекте.`)

    message.channel.send(embed)
    
} else if (args[0] == 'Knight'){
    db.set(`class_${message.guild.id}_${user.id}`, "Knight ⚔️")

    let embed = new Discord.RichEmbed()
    .setColor('#FFFFF0')
    .setFooter(user.username, user.displayAvatarURL)
    .setDescription(`Вы выбрали класс: **Рыцарь**\nУрон класса "**Рыцарь**" основывается на его силе.`)

    message.channel.send(embed)

} else if (args[0] == 'Assassin'){
    db.set(`class_${message.guild.id}_${user.id}`, "Assassin 🗡️")

    let embed = new Discord.RichEmbed()
    .setColor('#FFFFF0')
    .setFooter(user.username, user.displayAvatarURL)
    .setDescription(`Вы выбрали класс: **Ассасин**\nУрон класса "**Ассасин**" основывается на его ловкости.`)

    message.channel.send(embed)
}
}

module.exports.help = {
  name:"class",
  aliases: ["cls"]
}