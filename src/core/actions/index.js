module.exports = bot => {
  bot.action('commands', ctx => {
    ctx.editMessageText("Ainda não á comandos disponivéis");
  });
}
