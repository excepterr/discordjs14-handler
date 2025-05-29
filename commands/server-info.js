const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "server-info",
    description: "Показать информацию о сервере",
    options: [],
    run: async (client, interaction) => {
        const guild = interaction.guild;
        const owner = await guild.fetchOwner();
        const members = await guild.members.fetch();
        const bots = members.filter(m => m.user.bot).size;
        const humans = members.size - bots;
        
        const serverInfoEmbed = new EmbedBuilder()
            .setColor(0x2f3236)
            .setTitle(`${guild.name}`)
            .setDescription(`Владелец: \`${owner.user.tag}\`\nID сервера: \`${guild.id}\`\n Уровень буста: \`${guild.premiumTier}\`\n Бустов: \`${guild.premiumSubscriptionCount}\`\n Эмодзи: \`${guild.emojis.cache.size}\``)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: '– Дата создания', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: false },
                { name: '– Участники', value: `> Количество людей: ${humans}\n> Количество ботов: ${bots}\n> Общее количество людей/ботов: ${members.size}`, inline: true },
                { name: '– Каналы', value: `> Количество текстовых: ${guild.channels.cache.filter(c => c.type === 0).size}\n> Количество голосовых: ${guild.channels.cache.filter(c => c.type === 2).size}\n> Количество категорий: ${guild.channels.cache.filter(c => c.type === 4).size}`, inline: true }
            )
            .setTimestamp()
            .setFooter({ 
                text: `Запросил ${interaction.user.tag}`, 
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }) 
            });

        const guildIcon = guild.iconURL({ dynamic: true });
        if (guildIcon) {
            serverInfoEmbed.setThumbnail(guildIcon);
        }

        await interaction.reply({ embeds: [serverInfoEmbed] });
    }
};