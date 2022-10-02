const connection = require("../app/database");

class UserService {
  // 创建用户
  async create(user) {
    const { username, password } = user;
    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`;
    let result = null;
    result = await connection.execute(statement, [username, password]);
    return result[0];
  }

  // 通过用户名查找用户
  async getUserByName(user) {
    const statement = `SELECT * from users WHERE name = ?;`;
    const result = await connection.execute(statement, [user]);
    return result[0];
  }

  // 通过 userId 添加头像 url
  async uploadAvatarUrlByUserId(avatarUrl, userId) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [avatarUrl, userId])
    return result
  }
}
module.exports = new UserService();
