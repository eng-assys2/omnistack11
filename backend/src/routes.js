const express = require('express')

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
routes.post('/ongs', ongController.create)
routes.delete('/ongs/:id', ongController.delete)

routes.get('/profiles', profileController.index)
routes.post('/sessions', sessionController.create)

routes.get('/incidents', incidentController.index)
routes.post('/incidents', incidentController.create)
routes.delete('/incidents/:id', incidentController.delete)

module.exports = routes