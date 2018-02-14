import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import session from 'koa-session';
import logger from 'koa-logger';
import views from 'koa-views';
import path from 'path';

import './passportauth';
import './mongodb';

import { errorHandler } from './middlewares';
import { keys, config } from './config';
import r from './routes';

const app = new Koa();

app.use(views(`${path.resolve()}/views`, config.views));
app.use(bodyParser());
app.use(logger());

app.use(errorHandler);

app.keys = keys.sessionKeys;
app.use(session(config.session, app));

app.use(passport.initialize());
app.use(passport.session());

app.use(r.routes());

app.listen(3000);
