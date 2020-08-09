const Discord = require("discord.js");
const db = require("quick.db");
const mobs = require("../mobs.js")

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('rpg!'))return; 
    let user = message.author;


if(db.get(`grindActive_${message.guild.id}_${user.id}`) == 1){
  message.channel.send("Битва уже идет, не надо ломать пве!")
} else {

    if(db.get(`ownerAlive_${message.guild.id}_${user.id}`) == 0){
let embed = new Discord.RichEmbed()
.setColor('#FFFFF1')
.setDescription(`⚠️ Вы мертвы.`)

message.channel.send(embed)
    } else {

      db.set(`grindActive_${message.guild.id}_${user.id}`, 1)

let randomname = Math.floor(Math.random() * 3)

if(randomname == 0){
mobname = "Slime"

} else if(randomname == 1){
  mobname = "Rogue"

} else if(randomname == 2){
  mobname = "Wolf"

}


moblevel = db.get(`level_${message.guild.id}_${user.id}`) - 2 + Math.floor(Math.random() * 5)
if(moblevel == -1){
  moblevel = 1
} else if(moblevel == 0){
  moblevel = 1
}

  mobhp = 20 * moblevel + Math.floor(Math.random() * 15)

  mobdmg = 10 + (3 * moblevel) + Math.floor(Math.random() * 3)

  mobxp = moblevel * 15 + (Math.floor(Math.random() * 5) * moblevel)
  

  let numberofAttacks = Math.round(mobhp / db.get(`dmg_${message.guild.id}_${user.id}`))

let mobSlime = new Discord.RichEmbed()
.setColor("#FFFFF1")
.setDescription(`На вас напал моб **${mobname}**!\nЗдоровье: **${mobhp}**\nУрон: **${mobdmg}**\nУровень: **${moblevel}**\n\nВведите: **\`rpg!attack\`**, чтобы напасть или не вводите ничего, чтобы избежать битвы.`)
.setThumbnail("https://i.imgur.com/DxWJJqo.png")

let mobRobber = new Discord.RichEmbed()
.setColor("#FFFFF1")
.setDescription(`На вас напал моб **${mobname}**!\nЗдоровье: **${mobhp}**\nУрон: **${mobdmg}**\nУровень: **${moblevel}**\n\nВведите: **\`rpg!attack\`**, чтобы напасть или не вводите ничего, чтобы избежать битвы.`)
.setThumbnail("https://i.imgur.com/rPspHfd.png")

let mobWolf = new Discord.RichEmbed()
.setColor("#FFFFF1")
.setDescription(`На вас напал моб **${mobname}**!\nЗдоровье: **${mobhp}**\nУрон: **${mobdmg}**\nУровень: **${moblevel}**\n\nВведите: **\`rpg!attack\`**, чтобы напасть или не вводите ничего, чтобы избежать битвы.`)
.setThumbnail("https://i.imgur.com/g5F9Z8L.png")





if(randomname == 0){
  message.channel.send(mobSlime)
} else if(randomname == 1){
  message.channel.send(mobRobber)
} else if(randomname == 2){
  message.channel.send(mobWolf)
}

try {
  var response = await message.channel.awaitMessages(msg => msg.content == "rpg!attack", {
      maxMatches: 1,
      time: 15000,
      errors: ['time']
  });
} catch (err) {
  if (err) undefined
  db.set(`grindActive_${message.guild.id}_${user.id}`, 0)
  let embed = new Discord.RichEmbed()
  .setTitle('⚠️ Избежание битвы.')
  .setColor('#FFFFF1')
  .setDescription(`Вы избежали битвы с мобом.`)
  return message.channel.send(embed);
}
db.subtract(`currenthp_${message.guild.id}_${user.id}`, (mobdmg * numberofAttacks))
if(db.get(`currenthp_${message.guild.id}_${user.id}`) <= 0 ){
  db.set(`grindActive_${message.guild.id}_${user.id}`, 0)
  db.set(`ownerAlive_${message.guild.id}_${user.id}`, 0)
  }
  if(db.get(`grindActive_${message.guild.id}_${user.id}`) == 0){
    let embed = new Discord.RichEmbed()
    .setTitle('⚔️ Поражение.')
    .setColor('#FFFFF1')
    .setDescription(`Сражаясь с мобом, вы получили фатальный удар и погибли.`)

    message.channel.send(embed)
  } else {
  mobhp - (db.get(`dmg_${message.guild.id}_${user.id}`) * numberofAttacks)
let killedmob = new Discord.RichEmbed()
.setTitle('⚔️ Победа!')
.setColor('#FFFFF1')
.setDescription(`Вы убили моба за **${numberofAttacks}** атаки.\nУ вас осталось **${db.get(`currenthp_${message.guild.id}_${user.id}`)}** здоровья.\nВы получили **${mobxp}** опыта.`)
message.channel.send(killedmob)
db.set(`grindActive_${message.guild.id}_${user.id}`, 0)
db.add(`xp_${message.guild.id}_${user.id}`, mobxp)
  }
    }
  }
};
module.exports.help = {
    name:"grind",
    aliases: ["gr"]
  }