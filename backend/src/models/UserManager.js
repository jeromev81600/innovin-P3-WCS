/* eslint-disable camelcase */

const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  // Method to Execute the SQL query to insert the user into the database

  insert(user) {
    const {
      firstname,
      lastname,
      birth_date,
      email,
      hashed_password,
      wine_color,
      preference_description,
    } = user;

    return this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, birth_date, email, hashed_password, wine_color, preference_description) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        firstname,
        lastname,
        birth_date,
        email,
        hashed_password,
        wine_color,
        preference_description,
      ]
    );
  }

  // Method to Execute the SQL query to update the user from the database

  update(user, id) {
    const {
      admin_credentials,
      firstname,
      lastname,
      birth_date,
      email,
      hashed_password,
      wine_color,
      preference_description,
    } = user;
    return this.database.query(
      `update ${this.table} set admin_credentials = ?, firstname = ?, lastname = ?, birth_date = ?, email = ?, hashed_password = ?, wine_color = ?, preference_description = ? where id = ?`,
      [
        admin_credentials,
        firstname,
        lastname,
        birth_date,
        email,
        hashed_password,
        wine_color,
        preference_description,
        id,
      ]
    );
  }

  // Method to Execute the SQL query to find a user by it's email used in the middleware for the login

  findByEmail(email) {
    return this.database.query(`select * from  ${this.table} where email=?`, [
      email,
    ]);
  }

  // Method to Execute the SQL query to get the credentials of a user used in the middleware for the login

  getCredentials(sub) {
    return this.database.query(
      `select admin_credentials from ${this.table} where id=?`,
      [sub]
    );
  }

  // Method to Execute the SQL query to find users which are registered to a workshop

  findUsersInWorkshop(id_workshop) {
    return this.database.query(
      `SELECT * FROM ${this.table} INNER JOIN user_has_workshop ON ${this.table}.id = id_user WHERE id_Workshop = ? ORDER BY lastname, firstname, birth_date`,
      [id_workshop]
    );
  }
}

module.exports = UserManager;
