const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, args) => {

let user = message.author;

if(!args[0]){
  const embed = new Discord.RichEmbed()
  .setColor('#FFFFF1')
  .setDescription(`❌ Вы должны указать количество!`)
  message.channel.send(embed)

} else {

if(args[0] > db.get(`statpoints_${message.guild.id}_${user.id}`)){
  const embed = new Discord.RichEmbed()
  .setColor('#FFFFF0')
  .setDescription(`Вам недостаточно очков характеристики.\nКол-во ваших очков: **${db.get(`statpoints_${message.guild.id}_${user.id}`)}**`)
  message.channel.send(embed)
} else {

if (isNaN(args[0])) return;
    db.add(`int_${message.guild.id}_${user.id}`, args[0])
if (isNaN(args[0])) return;
    db.subtract(`statpoints_${message.guild.id}_${user.id}`, args[0])

    const embed = new Discord.RichEmbed()
    .setColor('#FFFFF0')
    .setDescription(`Успешно было добавлено ${args[0]} интеллекта`)
    
    message.channel.send(embed)
}
}
};

module.exports.help = {
  name:"addintellect",
  aliases: ["addint"]
}