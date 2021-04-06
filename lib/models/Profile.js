const pool = require('../utils/pool');

module.exports = class Profile {
  id;
  name;
  quote;
  character;
  image;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.quote = row.quote;
    this.character = row.character;
    this.image = row.image;
  }

  static async insert({ name, quote, character, image }) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO profiles (name, quote, character, image) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, quote, character, image]
    );
    return new Profile(rows[0]);
  }

  static async getUsers() {
    const { rows } = await pool.query('SELECT * FROM profiles');
    return rows.map((row) => new Profile(row));
  }
  static async getUser(id) {
    const { rows } = await pool.query('SELECT * FROM profiles WHERE id = $1', [
      id,
    ]);
    return rows;
  }
  static async changeUser(id, name) {
    const {
      rows,
    } = await pool.query(
      'UPDATE profiles SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    return new Profile(rows[0]);
  }
  static async deletedUser(id) {
    const {
      rows,
    } = await pool.query('DELETE FROM profiles WHERE id = $1 RETURNING *', [
      id,
    ]);
    return rows;
  }
};
