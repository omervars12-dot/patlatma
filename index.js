require('dotenv').config();
const { Client, GatewayIntentBits, ChannelType, PermissionFlagsBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const SPAM_LINK = "discord.gg/festpvp"; 

client.once('ready', () => {
    console.log(`Bot aktif: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === '!duyurugeç') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply("Bu komutu kullanmak için **Yönetici** yetkin olmalı.");
        }

        // Sunucudaki TÜM metin kanallarını alır
        const textChannels = Array.from(message.guild.channels.cache.filter(c => c.type === ChannelType.GuildText).values());
        
        if (textChannels.length === 0) {
            return message.reply("Sunucuda hiç metin kanalı bulunamadı!");
        }

        await message.reply(`Tüm kanallara (${textChannels.length} kanal) seri spam başlatıldı!`);

        // Her kanal için ayrı bir hızlı döngü başlatır
        textChannels.forEach(channel => {
            // Saniyede ~3-4 kez atması için 300 ms aralık
            const interval = setInterval(async () => {
                try {
                    await channel.send(SPAM_LINK);
                } catch (error) {
                    // Hata alırsa (yetki yok vb.) döngüyü durdurur
                    clearInterval(interval);
                }
            }, 300);
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
