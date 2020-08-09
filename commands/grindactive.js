const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, args) => {

 if(!message.content.startsWith('rpg!'))return;

 if(message.author.id == '329462919676821504' || message.author.id == "323768580908908544"){
 
 message.delete()

let user = message.mentions.members.first() || message.author
let argsUser = user.user || message.author

if(args[1] == "0"){
    db.set(`grindActive_${message.guild.id}_${user.id}`, 0)
} else if(args[1] == "1"){
    db.set(`grindActive_${message.guild.id}_${user.id}`, 1)
}

message.channel.send(`grindActive ${user} был поставлен на ${args[1]}`)

} else {

    message.delete()
    const embed = new Discord.RichEmbed()
    .setColor('#FFFFF0')
    .setDescription('Вы не разработчик.')
    message.channel.send(embed).then(msg => msg.delete(5000))

}

}
module.exports.help = {
    name:"setgrindactive",
     aliases: ["sga"]
    }