const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  
  if(!message.content.startsWith('rpg!'))return;  

  let user = message.mentions.members.first() || message.author;
  let argsUser = user.user || message.author

  let cls = await db.get(`class_${message.guild.id}_${user.id}`)
  if(cls === null || 0) cls = "Не выбран ❓"

  let statpoints = await db.fetch(`statpoints_${message.guild.id}_${user.id}`)
  if (statpoints === null) statpoints = 20;

  let str = await db.fetch(`str_${message.guild.id}_${user.id}`)
  if (str === null || 0) str = 10;

  let agi = await db.fetch(`agi_${message.guild.id}_${user.id}`)
  if (agi === null || 0) agi = 10;

  let int = await db.fetch(`int_${message.guild.id}_${user.id}`)
  if (int === null || 0) int = 10;

  
  let maxhp = await db.fetch(`maxhp_${message.guild.id}_${user.id}`)
  if (maxhp === null ) maxhp = 100
  

  let currenthp = await db.fetch(`currenthp_${message.guild.id}_${user.id}`)
  if (currenthp === null ) currenthp = maxhp

  let dmg = await db.fetch(`dmg_${message.guild.id}_${user.id}`)
  if (dmg === null ) dmg = 10

  let armor = await db.fetch(`armor_${message.guild.id}_${user.id}`)
  if (armor === null ) armor = 0


  



 hp1 = Math.round(db.get(`currenthp_${message.guild.id}_${user.id}`) / 10)
 //hplvl = "❤️".repeat(hp1) + "💔".repeat(10 - hp1)

  let embed = new Discord.RichEmbed() 
  .setColor('#FFFFF1')
  .setFooter(`Очков характеристики: ${statpoints}♦️`)
  .setThumbnail(argsUser.avatarURL)
  .addField('Характеристики', `Сила: **${str}** ⚔️\nЛовкость: **${agi}** 🗡️\nИнтеллект: **${int}** 💠`)
  .setDescription(`♦️ Статистика игрока ${user} ♦️`)
  .addField('Статы', `Урон: **${db.get(`dmg_${message.guild.id}_${user.id}`)}** 🔪\nЗдоровье: **${currenthp} / ${maxhp}** ❤️\nБроня: **${armor}** 🛡️`)

  message.channel.send(embed)
};

module.exports.help = {
  name:"stats",
  aliases: ["st"]
}
