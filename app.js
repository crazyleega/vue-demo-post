const Koa = require('koa')
    ,koa = require('koa-router')()
    ,json = require('koa-json')
    ,jwt = require('koa-jwt')
    ,api = require('./server/routers/api.js')
    ,auth = require('./server/routers/auth.js')
    ,path = require('path')
    ,serve = require('koa-static')
    ,historyApiFallback = require('koa-history-api-fallback');
    
const app = new Koa();

// 静态文件serve在koa-router的其他规则之上 


app.use(require('koa-bodyparser')());
app.use(json());
app.use(historyApiFallback()); // 在这个地方加入。一定要加在静态文件的serve之前，否则会失效。

app.use(serve(path.resolve('dist'))); // 将webpack打包好的项目目录作为Koa静态文件服务的目录

koa.use('/auth', auth.routes()); 
koa.use("/api",jwt({secret: 'crazy'}),api.routes());

app.use(koa.routes());

app.listen(8889,() => {
  console.log('Koa is listening in 8889');
});

module.exports = app;