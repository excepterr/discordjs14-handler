const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: "about",
    description: "Показать информацию о боте",
    options: [],
    run: async (client, interaction) => {
        const guildsCount = client.guilds.cache.size;
        const ping = client.ws.ping;
        
        const aboutEmbed = new EmbedBuilder()
            .setColor(0x2f3236)
            .setAuthor({ 
                name: client.user.username, 
                iconURL: client.user.displayAvatarURL() 
            })
            .setDescription(`${client.user.username} — многофункциональный бот для вашего Discord-сервера. Создан чтобы упростить модерацию и развлечь участников.`)
            .addFields(
                { 
                    name: '– Техническая информация', 
                    value: `> Версия бота: \`v1.0.1 ALFA\`\n> Обслуживаю серверов: \`${guildsCount}\`\n> Ping: \`${ping}ms\``, 
                    inline: true 
                },
                { 
                    name: '– Наши ссылки', 
                    value: '> [Пригласить бота](https://discord.com/oauth2/authorize?client_id=1377630455070724217&permissions=8&integration_type=0&scope=applications.commands+bot)\n> [Сервер поддержки](https://discord.gg/zmF8VdB2XJ)\n> [GitHub](https://github.com)',
                    inline: true 
                }
            )
            .setTimestamp()
            .setFooter({ 
                text: 'Разработано с любовью - excepterr 💖', 
                iconURL: 'https://cdn.discordapp.com/embed/avatars/2.png' 
            });

        const boostButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Поддержать автора')
                    .setURL('https://discord.gg/ваша_ссылка_на_буст')
                    .setStyle(ButtonStyle.Link)
            );

        await interaction.reply({ 
            embeds: [aboutEmbed], 
            components: [boostButton] 
        });
    }
};