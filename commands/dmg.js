const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('rpg!'))return;  
    let user = message.mentions.members.first() || message.author;

    if(message.author.id == '329462919676821504' || message.author.id == "323768580908908544"){

    if (isNaN(args[1])) return;
        db.subtract(`currenthp_${message.guild.id}_${user.id}`, args[1])
    
        const embed = new Discord.RichEmbed()
        .setColor('#FFFFF0')
        .setDescription(`Было нанесено **${args[1]}** урона игроку ${user}`)
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
    name:"damage",
    aliases: ["dmg"]
  }