const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('rpg!'))return;  

  let user = message.author;
  let mention = message.mentions.members.first() 

  if(db.get(`maxhp_${message.guild.id}_${user.id}`) == db.get(`currenthp_${message.guild.id}_${user.id}`)){
    let embed = new Discord.RichEmbed()
    .setColor("#FFFFF1")
    .setDescription(`❌ У вас уже максимум здоровья.`);
    message.channel.send(embed)
  } else {

  let timeout = 0;
  let amount = 10 * Math.round(db.get(`int_${message.guild.id}_${user.id}`) / 5) + Math.floor(Math.random() * 5)

  let timeheal = await db.fetch(`timeheal_${message.guild.id}_${user.id}`);

  if (timeheal !== null && timeout - (Date.now() - timeheal) > 0) {
    let time = ms(timeout - (Date.now() - timeheal));
  
    let timeEmbed = new Discord.RichEmbed()
    .setColor("#FFFFF1")
    .setDescription(` Вы уже похилились недавно или кого-то похилили.\nВы можете похилиться снова через **${time.seconds}** секунд. `);
    message.channel.send(timeEmbed)

  } else {

    if(mention){

      if(db.get(`maxhp_${message.guild.id}_${mention.id}`) == db.get(`currenthp_${message.guild.id}_${mention.id}`)){
        let embed = new Discord.RichEmbed()
        .setColor("#FFFFF1")
        .setDescription(`❌ У него уже максимум здоровья.`);
        message.channel.send(embed)

      } else {

        if(amount + db.get(`currenthp_${message.guild.id}_${mention.id}`) > db.get(`maxhp_${message.guild.id}_${mention.id}`)){
          amount = db.get(`maxhp_${message.guild.id}_${mention.id}`) - db.get(`currenthp_${message.guild.id}_${mention.id}`)
        }

      db.add(`currenthp_${message.guild.id}_${mention.id}`, amount)
      db.set(`timeheal_${message.guild.id}_${user.id}`, Date.now())

      if(db.get(`currenthp_${message.guild.id}_${mention.id}`) > db.get(`maxhp_${message.guild.id}_${mention.id}`)){
        db.set(`currenthp_${message.guild.id}_${mention.id}`, db.get(`maxhp_${message.guild.id}_${mention.id}`))
      }

      let embed = new Discord.RichEmbed()
    .setColor("#FFFFF1")
    .setDescription(`💖 Вы успешно похилили **${mention}** на ${amount} здоровья\nЕго здоровье: ${db.get(`currenthp_${message.guild.id}_${mention.id}`)}`);
    message.channel.send(embed)
      }
  

    } else {

      if(amount + db.get(`currenthp_${message.guild.id}_${user.id}`) > db.get(`maxhp_${message.guild.id}_${user.id}`)){
        amount = db.get(`maxhp_${message.guild.id}_${user.id}`) - db.get(`currenthp_${message.guild.id}_${user.id}`)
      }


  db.add(`currenthp_${message.guild.id}_${user.id}`, amount)
  db.set(`timeheal_${message.guild.id}_${user.id}`, Date.now())

  if(db.get(`currenthp_${message.guild.id}_${user.id}`) > db.get(`maxhp_${message.guild.id}_${user.id}`)){
    db.set(`currenthp_${message.guild.id}_${user.id}`, db.get(`maxhp_${message.guild.id}_${user.id}`))
  }



  let embed = new Discord.RichEmbed()
  .setColor("#FFFFF1")
  .setDescription(`💖 Вы успешно похилились на ${amount} здоровья\nВаше здоровье: ${db.get(`currenthp_${message.guild.id}_${user.id}`)}`);
  message.channel.send(embed)
  }

  }
  
  }
};


module.exports.help = {
  name:"heal",
  aliases: ["hl"]
}