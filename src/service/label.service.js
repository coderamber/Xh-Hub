const connection = require('../app/database')

class LabelService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`
    const [reslut] = await connection.execute(statement, [name])
    return reslut
  }

  async getLabel(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`
    const [reslut] = await connection.execute(statement, [name])
    return reslut[0]
  }

  async getLabels(offset, limit) {
    const statement = `SELECT * FROM label LIMIT ?, ?;`
    const [result] = await connection.execute(statement, [offset, limit])
    return result
  }
}

module.exports = new LabelService()