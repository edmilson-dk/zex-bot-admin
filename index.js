require('dotenv').config();
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

async function isAdmin(userId, ctx) {
  const { status } = await ctx.getChatMember(userId);
  const isAdmin = status === 'creator' || status === 'administrator';
    
  return isAdmin;
}

async function theBotIsAdmin(ctx) {
  const botId = ctx.botInfo.id;
  const isBotAdmin = await isAdmin(botId, ctx);

  return isBotAdmin;
}

bot.command('start', async ctx => {
  const { type } = await ctx.getChat();

  if (type === 'private') {
    ctx.telegram.sendMessage(ctx.chat.id, 'Olá! escolha uma opção abaixo', {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Me adicione em seu grupo", url: `http://t.me/${process.env.BOT_USERNAME}?startgroup=botstart` }],
          [{ text: "Ver comandos", callback_data: "commands" }],
        ]
      }
    }); 
  } else {
    ctx.reply('Oi! me chamou😆 como posso ajudar?');
  }
});

bot.action('commands', ctx => {
  ctx.editMessageText("Ainda não á comandos disponivéis");
})

bot.command('ban', async ctx => {
  if ((await theBotIsAdmin(ctx))) {
    const isMemberAdmin = isAdmin(chat.message.from.id, ctx);

    const markedMessageUserId = ctx.message.reply_to_message 
      ? ctx.message.reply_to_message.from.id
      : undefined;

    if (isMemberAdmin){
      markedMessageUserId
        ? ctx.kickChatMember(markedMessageUserId)
        : ctx.reply('Marque a mensagem do úsuario(a) a ser removido.');
    } else {
      ctx.reply(`@${ctx.message.from.username} você não é Administrador do grupo!`);
    }
  } else {
    ctx.reply('Não sou admistrador do seu grupo, para remover úsuarios.')
  }
});

bot.on('left_chat_member', ctx => {
  const memberRemoved = ctx.message.left_chat_member;

  ctx.reply(`O(a) úsuario ${memberRemoved.first_name} se foi...`);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
