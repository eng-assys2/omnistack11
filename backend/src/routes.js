const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const routes = express.Router()

const ongController = require('./controllers/OngController')
const incidentController = require('./controllers/IncidentController')
const profileController = require('./controllers/ProfileController')
const sessionController = require('./controllers/SessionController')

/**
 * Métodos HTTP
 * GET: Buscar/listar uma informação do backend
 * POST: Criar uma informação no backend
 * PUT: Atualizar uma informação no backend
 * DELETE: Apagar uma informação no backend
*/

/**
 * Tipos de parâmetros
 * Query Params: parâmetros nomeados enviados na rota após '?' utilizados para filtro, paginação
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

routes.get('/', (req, resp) => {
  return resp.json({
    evento: 'Semana Omnistack 11.0',
    aluno: 'Lucas Assis'
  })
})
routes.get('/ongs', ongController.index)
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(12),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), ongController.create)
routes.delete('/ongs/:id', ongController.delete)

routes.get('/profiles', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), profileController.index)
routes.post('/sessions', sessionController.create)

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), incidentController.index)
routes.post('/incidents', incidentController.create)
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), incidentController.delete)

module.exports = routes