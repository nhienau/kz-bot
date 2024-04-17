require("dotenv").config();
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Danh sách các lệnh"),
  async execute(interaction) {
    const message = `\`/1v1d3llz\` - Ảnh về Hồng Huy Hoàng
    \`/bach\` - Ảnh của chủ server
    \`/bubble\` - Bong bóng
    \`/kz\` - Ảnh của tất cả anh em Kz
    \`/meme\` - Những câu chat, comment, hình vớ vẩn của anh em Kz
    \`/pick\` - Chọn 1 lựa chọn ngẫu nhiên
    \`/random\` - Chọn 1 số ngẫu nhiên trong khoảng chỉ định
    \`/shitpost\` - Shitpost, văn mẫu
    \`/video\` - Video
    \`/when\` - Dùng khi có ai hỏi "khi nào"
    Anh em sử dụng bot lưu ý không spam lệnh liên tục (cách khoảng 3-5s).
    Nếu có ý tưởng lệnh mới hoặc muốn đóng góp hình ảnh, shitpost thì ping <@${process.env.OWNER_ID}>`;

    const embed = new EmbedBuilder().setDescription(message);
    await interaction.reply({ embeds: [embed] });
  },
};
