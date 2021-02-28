require('dotenv').config();
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

const commands = require('./core/commands');
const actions = requore('./core/actions');

commands(bot);
actions(bot);

bot.on('left_chat_member', ctx => {
  const memberRemoved = ctx.message.left_chat_member;

  ctx.reply(`O(a) úsuario ${memberRemoved.first_name} se foi...`);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
