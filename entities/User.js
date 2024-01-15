import knex from "../database/index.js"
import BaseEntity from './BaseEntity.js'

class User extends BaseEntity {
    email = new String()
    password = new String()

    constructor(email, password) {
        email = email
        password = password
    }

    static async findByEmail(email) {
        const user = await knex.table('users').where('email', email).first()

        return new User(user.email, user.password)
    }

    async checkPassword(password) {
        const user = knex.table('users').where('email', this.email)

        if (user.password !== password) return false
        else return true
    }
}

export default User
