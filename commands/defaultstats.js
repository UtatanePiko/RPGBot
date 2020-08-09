const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, args) => {

 if(!message.content.startsWith('rpg!'))return;

 if(message.author.id == '329462919676821504' || message.author.id == "323768580908908544"){
 
 message.delete()

let user = message.mentions.members.first() || message.author
let argsUser = user.user || message.author

db.set(`str_${message.guild.id}_${user.id}`, 10)
db.set(`agi_${message.guild.id}_${user.id}`, 10)
db.set(`int_${message.guild.id}_${user.id}`, 10)
db.set(`statpoints_${message.guild.id}_${user.id}`, 20)
db.set(`maxhp_${message.guild.id}_${user.id}`, 100)
db.set(`currenthp_${message.guild.id}_${user.id}`, 100)
db.set(`class_${message.guild.id}_${user.id}`, "Не выбран ❓")
db.set(`level_${message.guild.id}_${user.id}`, 1)
db.set(`xp_${message.guild.id}_${user.id}`, 0)
db.set(`dmg_${message.guild.id}_${user.id}`, 0)
db.set(`armor_${message.guild.id}_${user.id}`, 0)

let embed = new Discord.RichEmbed()
.setColor('#FFFFF0')
.setFooter(argsUser.username, argsUser.displayAvatarURL)
.setDescription(`Все характеристики игрока ${user} были сброшены до стандартных.`)

message.channel.send(embed).then(msg => msg.delete(5000))

} else {

    message.delete()
    const embed = new Discord.RichEmbed()
    .setColor('#FFFFF0')
    .setDescription('Вы не разработчик.')
    message.channel.send(embed).then(msg => msg.delete(5000))

}

}
module.exports.help = {
    name:"setdefaultstats",
     aliases: ["sds"]
    }