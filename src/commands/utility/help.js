require("dotenv").config();
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Danh sách các lệnh"),
  async execute(interaction) {
    const message =
      "`/1v1d3llz` - Ảnh về Hồng Huy Hoàng\n" +
      "`/bach` - Ảnh của chủ server\n" +
      "`/bubble` - Bong bóng\n" +
      "`/kz` - Ảnh anh em Kz\n" +
      "`/meme` - Chat, comment, hình linh tinh\n" +
      "`/pick` - Chọn 1 lựa chọn ngẫu nhiên\n" +
      "`/random` - Chọn 1 số ngẫu nhiên trong khoảng chỉ định\n" +
      "`/shitpost` - Shitpost, văn mẫu\n" +
      "`/video` - Video\n" +
      '`/when` - Dùng khi có ai hỏi "khi nào"\n' +
      "Anh em sử dụng bot lưu ý không spam lệnh liên tục (cách khoảng 3-5s).\n" +
      `Báo lỗi, góp ý tính năng mới hoặc đóng góp hình ảnh, shitpost: ping <@${process.env.OWNER_ID}>.`;
    const embed = new EmbedBuilder().setDescription(message);
    await interaction.reply({ embeds: [embed] });
  },
};
