const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('rpg!'))return;  
    let user = message.mentions.members.first() || message.author;

    if(message.author.id == '329462919676821504' || message.author.id == "323768580908908544"){
         

        if (isNaN(args[1])) return;
        db.set(`level_${message.guild.id}_${user.id}`, args[1])
    
        const embed = new Discord.RichEmbed()
        .setColor('#FFFFF0')
        .setDescription(`Уровень игрока ${user} был установлен на ${args[1]}`)
        message.channel.send(embed)

    } else {

        message.delete()
        const embed = new Discord.RichEmbed()
        .setColor('#FFFFF0')
        .setDescription('Вы не разработчик.')
        message.channel.send(embed).then(msg => msg.delete(5000))
   
    }

};
module.exports.help = {
    name:"setlevel",
    aliases: ["setlvl"]
  }