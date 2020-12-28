const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db')
var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

if (message.author.id !== message.guild.owner.user.id&&message.author.id!=ayarlar.sahip) return message.reply(`Yeterli yetki bulunmamakta. Sadece sunucu sahibi ve bot  sahibi bu özelliği kullanabilir.`);
  

  if(args[0] === "0" || args[0] === "sıfırla") {
    await db.delete(`kayitrolver_${message.guild.id}`)
    message.reply('Kayıt verilecek rol ayarı başarıyla devre dışı bırakıldı!')
    return
  }
  
  
  let rol = message.mentions.roles.first()
  
    if (!rol) {
        return message.reply("Lütfen kayıtta verilecek rolü belirtin.")
    }


  
    db.set(`kayitrolver_${message.guild.id}`, "<@&"+rol.id+">")
  
    message.channel.send(`Kayıt rol verme aktif edildi, rol ise ${rol} olarak belirtildi.`)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kayit-rolver-ayar'],
    kategori:'moderasyon',
    permLevel: 0
};

exports.help = {
    name: 'kayit-rolver-ayar',
    description: 'Kayıt edilene verilecek rolü ayarlar.',
    usage: 'kayit-rolver-ayar <rol> || 0 || sıfırla',
};