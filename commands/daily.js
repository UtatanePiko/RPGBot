const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const profile = require("./profile")

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('rpg!'))return;  

  let user = message.author;

  let timeout = 86400000;
  let amount = 200;

  let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
  
    let timeEmbed = new Discord.RichEmbed()
    .setColor("#FFFFF0")
    .setFooter(user.username, user.displayAvatarURL)
    .setDescription(`Вы уже собрали свою ежедневную награду.\n\nВы можете собрать ее через **${time.hours}h ${time.minutes}m ${time.seconds}s** `);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.RichEmbed()
  .setColor("#FFFFF0")
  .setFooter(user.username, user.displayAvatarURL)
  .setDescription(`<:Check:618736570337591296> Вы получили ежедневную награду: **${amount}** монет`);
  
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`daily_${message.guild.id}_${user.id}`, Date.now())


  }
};


module.exports.help = {
  name:"daily",
  aliases: ["day"]
}