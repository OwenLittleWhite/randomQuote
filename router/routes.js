'use strict'

const handler = require('./handler')
const Router = require('restify-router').Router
const routerInstance = new Router()

routerInstance.get('/random_quote', function (req, res, next) {
  handler.getRandomQuote(req.params, res)
  return next()
})

module.exports = routerInstance
