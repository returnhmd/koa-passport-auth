import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import passport from 'koa-passport';
import views from 'koa-views';
import path from 'path';

import './passport/googleauth.mjs';
import './mongodb.mjs';

import * as config from './config.mjs';
import r from './routes/index.mjs';

const app = new Koa();

app.use(views(`${path.resolve()}/views`, config.views));
app.use(bodyParser());
app.use(logger());

app.keys = ['123'];
app.use(session(config.session, app));

app.use(passport.initialize());
app.use(passport.session());

app.use(r.routes());

app.listen(3000);
