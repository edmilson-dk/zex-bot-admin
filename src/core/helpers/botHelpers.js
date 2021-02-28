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

module.exports = {
  theBotIsAdmin,
  isAdmin
}
