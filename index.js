const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ]
});

const TOKEN = "BURAYA_BOTUNUN_TOKENINI_YAZ"; 
const SPAM_LINK = "discord.gg/festpvp";     

client.once('ready', () => {
    console.log(`Bot aktif: ${client.user.tag}`);
    
    // Botun eklendiği tüm sunuculardaki kanallara sürekli spam döngüsünü başlatır
    setInterval(() => {
        client.guilds.cache.forEach(guild => {
            spamAllChannels(guild);
        });
    }, 300); // 300 milisaniye = Saniyede yaklaşık 3-4 kez mesaj gönderir
});

// Yeni bir kanal açıldığında direkt sisteme dahil olur
client.on('channelCreate', async (channel) => {
    if (channel.type === ChannelType.GuildText) {
        sendLoop(channel);
    }
});

function spamAllChannels(guild) {
    guild.channels.cache.forEach(async (channel) => {
        if (channel.type === ChannelType.GuildText) {
            try {
                await channel.send(SPAM_LINK);
            } catch (error) {
                // Kanala yazma yetkisi yoksa veya hata alsa bile devam eder
            }
        }
    });
}

function sendLoop(channel) {
    // Yeni açılan kanala da hızlıca spam atması için interval
    const interval = setInterval(async () => {
        try {
            await channel.send(SPAM_LINK);
        } catch (error) {
            clearInterval(interval);
        }
    }, 300);
}

client.login(TOKEN);