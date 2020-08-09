const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('rpg!'))return;  
    let user = message.mentions.members.first() || message.author;

    if(message.author.id == '329462919676821504' || message.author.id == "323768580908908544"){

        db.set(`currenthp_${message.guild.id}_${user.id}`, db.get(`maxhp_${message.guild.id}_${user.id}`))

        const embed = new Discord.RichEmbed()
        .setColor('#FFFFF1')
        .setDescription(`Игрок ${user} был отхилен до максимума.`)
        message.channel.send(embed)

    } else {

        message.delete()
        const embed = new Discord.RichEmbed()
        .setColor('#FFFFF1')
        .setDescription('Вы не разработчик.')
        message.channel.send(embed).then(msg => msg.delete(5000))
    }


    };
    module.exports.help = {
        name:"fullheal",
        aliases: ["fh"]
      }