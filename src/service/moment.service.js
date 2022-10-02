const connection = require("../app/database");
const { APP_HOST, APP_PORT } = require('../app/config')

class MomentService {
  async create(content, user_id) {
    const statement = `INSERT INTO moment(content, user_id) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [content, user_id]);
    return result;
  }
  async getMomentById(id) {
    const statement = `
      SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) author
      FROM moment m LEFT JOIN users u ON m.user_id = u.id
      WHERE m.id = ?;
    `
    const [result] = await connection.execute(statement, [id])
    return result
  }
  async getMomentList(offset, size) {
    const statement = `
      SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) users,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label mc WHERE mc.moment_id = m.id) labelCount,
        (SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/moment/images/', file.filename)) FROM file WHERE file.moment_id = m.id) images
      FROM moment m LEFT JOIN users u ON m.user_id = u.id
      LIMIT ?, ?;
    `;
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }

  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [content, momentId])
    return result
  }

  async deleteMoment(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const [result] = await connection.execute(statement, [momentId])
    return result
  }

  async checkLabelAndCommentExists(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
    const [reslut] = await connection.execute(statement, [momentId, labelId])
    return reslut[0] ? true : false
  }

  async addLabelAndComment(momentId, labelId) {
    const statement = "INSERT INTO moment_label(moment_id, label_id) VALUES (?, ?);"
    const [reslut] = await connection.execute(statement, [momentId, labelId])
    return reslut
  }
}

module.exports = new MomentService();
