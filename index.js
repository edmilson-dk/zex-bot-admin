require('dotenv').config();
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, 'Olá! escolha uma opção abaixo', {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Me adicione em seu grupo", url: `http://t.me/${process.env.BOT_USERNAME}?startgroup=botstart` }],
          [{ text: "Ver comandos", callback_data: "commands" }],
        ]
      }
    }
  )
});

bot.command('ban', async ctx => {
  const { status } = await ctx.getChatMember(ctx.message.from.id);
  const isAdmin = status === 'creator' || status === 'administrator';
  
  const markedMessageUserId = ctx.message.reply_to_message 
    ? ctx.message.reply_to_message.from.id
    : undefined;

  if (isAdmin){
    markedMessageUserId
      ? ctx.kickChatMember(markedMessageUserId)
      : ctx.reply('Marque a mensagem do úsuario(a) a ser removido.');
  } else {
    ctx.reply(`@${ctx.message.from.username} você não é Administrador do grupo!`);
  }
});

bot.on('left_chat_member', ctx => {
  const memberRemoved = ctx.message.left_chat_member;

  ctx.reply(`O(a) úsuario ${memberRemoved.first_name} se foi...`);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
