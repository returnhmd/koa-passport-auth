export function errorHandler() {
  return async (ctx, next) => {
    try {
      await next();
      if (ctx.status === 404) ctx.throw(404);
    } catch (e) {
      await ctx.render('error.pug', {
        statusCode: e.status,
        message: e.message,
      });
    }
  };
}

export function withAuth() {
  return async (ctx, next) => {
    if (ctx.isUnauthenticated()) {
      ctx.throw(401);
    }
    await next();
  };
}
