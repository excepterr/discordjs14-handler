const { EmbedBuilder } = require('discord.js');
const { formatDistanceToNow } = require('date-fns');
const { ru } = require('date-fns/locale');

module.exports = {
    name: "user-info",
    description: "Показать информацию о пользователе",
    options: [
        {
            name: "пользователь",
            description: "Выберите пользователя",
            type: 6,
            required: false
        }
    ],
    run: async (client, interaction) => {
        const targetUser = interaction.options.getUser("пользователь") || interaction.user;
        const targetMember = interaction.guild?.members.cache.get(targetUser.id) || await interaction.guild?.members.fetch(targetUser.id).catch(() => null);
        
        const joinDate = targetMember?.joinedAt;
        const createDate = targetUser.createdAt;
        
        const joinDateStr = joinDate ? 
            `<t:${Math.floor(joinDate.getTime() / 1000)}:D> в <t:${Math.floor(joinDate.getTime() / 1000)}:t>\n(${formatDistanceToNow(joinDate, { addSuffix: true, locale: ru })})` : 
            "Неизвестно";
        
        const createDateStr = 
            `<t:${Math.floor(createDate.getTime() / 1000)}:D> в <t:${Math.floor(createDate.getTime() / 1000)}:t>\n(${formatDistanceToNow(createDate, { addSuffix: true, locale: ru })})`;

        const userInfoEmbed = new EmbedBuilder()
            .setColor(0x2f3236)
            .setTitle(`${targetUser.tag} (ID: ${targetUser.id})`)
            .setThumbnail(targetUser.displayAvatarURL({ dynamic: true, size: 4096 }))
            .addFields(
                {
                    name: 'Присоединился',
                    value: joinDateStr,
                    inline: false
                },
                {
                    name: 'Аккаунт создан',
                    value: createDateStr,
                    inline: false
                }
            )
            .setTimestamp()

        await interaction.reply({ embeds: [userInfoEmbed] });
    }
};