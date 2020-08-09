const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  
  if(!message.content.startsWith('rpg!'))return;  

  let user = message.mentions.members.first() || message.author;
  let argsUser = user.user || message.author

  let ownerAlive = await db.fetch(`ownerAlive_${message.guild.id}_${user.id}`)
  if (ownerAlive === null) ownerAlive = 1;

  let grindActive = await db.fetch(`grindActive_${message.guild.id}_${user.id}`)
  if (grindActive === null) grindActive = 0;

  let statpoints = await db.fetch(`statpoints_${message.guild.id}_${user.id}`)
  if (statpoints === null) statpoints = 20;

  let cls = await db.get(`class_${message.guild.id}_${user.id}`)
  if(cls === null || 0) cls = "Не выбран ❓"

  let xp = await db.fetch(`xp_${message.guild.id}_${user.id}`)
  if (xp === null) xp = 0;

  let level = await db.fetch(`level_${message.guild.id}_${user.id}`)
  if (level === null) level = 1;

  let nxtlvlxp = Math.floor(db.get(`level_${message.guild.id}_${user.id}`) * 300)
  xp1 = Math.round(db.get(`xp_${message.guild.id}_${user.id}`) / (30 * db.get(`level_${message.guild.id}_${user.id}`)))
  xplevel = "⬜".repeat(xp1) + "🔳".repeat(10 - xp1)


  const embed = new Discord.RichEmbed()
  .setColor('#FFFFF0')
  .setDescription(`♦️ Характеристики игрока:  ${user} ♦️\n\nОпыт: ${xplevel} **${xp} / ${nxtlvlxp}**\nУровень: **${level}** 🔱\nКласс: **${cls}**`)
  .setFooter(`Очков характеристики: ${statpoints}♦️`)
  .setThumbnail(argsUser.avatarURL)


message.channel.send(embed)

};

module.exports.help = {
  name:"profile",
  aliases: ["prof"]
}
