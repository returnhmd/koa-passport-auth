export async function withAuth(ctx, next) {
  if (ctx.isUnauthenticated()) {
    ctx.throw(401);
  }
  await next();
}

export async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (e) {
    ctx.status = e.status;
    ctx.render('error.pug', { statusCode: e.status, message: e.message });
    ctx.app.emit('error', e, ctx);
  }
}
