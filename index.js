'use strict'

const restify = require('restify')
const conf = require('./conf/app.js')
const routes = require('./router/routes.js')
const Logger = require('bunyan')
const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
  preflightMaxAge: 5, // Optional
  origins: ['*']
})

var server = restify.createServer({
  name: conf.name,
  log: Logger.createLogger({
    name: conf.name,
    serializers: restify.bunyan.serializers
  })
})

server.use(restify.plugins.queryParser({
  mapParams: true
}))
server.use(restify.plugins.bodyParser({
  mapParams: true
}))

server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.requestLogger())

server.use(restify.plugins.gzipResponse())
server.pre(restify.plugins.pre.userAgentConnection())
server.pre(restify.plugins.pre.sanitizePath())

server.pre(function (request, response, next) {
  response.charSet('utf-8')
  request.log.info({
    req: request
  }, 'REQUEST')
  next()
})

routes.applyRoutes(server)

server.listen(conf.port, function () {
  console.log('%s listening at :%s ', server.name, server.url)
})
