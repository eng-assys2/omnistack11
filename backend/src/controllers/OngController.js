const crypto = require('crypto')

const connection = require('../database/connection')

module.exports = {
  async index(req, resp) {
    const { page = 1 } = req.query
    const ongs = await connection('ongs')
      .limit(5)
      .offset((page - 1) * 5)
      .select('*')

    return resp.json({ ongs })
  },
  async create(req, resp) {
    const { name, email, whatsapp, city, uf } = req.body
    const id = crypto.randomBytes(4).toString('HEX')
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })
    return resp.json({ id })
  },
  async delete(req, resp) {

  }
}

