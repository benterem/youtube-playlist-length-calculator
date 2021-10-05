const logger = require('./logger')

const requestLogger = (request, response, next) => {
  console.info('Method:', request.method)
  console.info('Path:', request.path)
  console.info('Body:', request.body)
  console.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if(error.name === 'ValidationError'){
    return response.status(400).send({ error: error.message })
  }
  
  next(error)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }