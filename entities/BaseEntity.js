class BaseEntity {
    id = new Number()
    createdAt = new Date()
    updatedAt = new Date()

    findOne(id) {
        return 'entidade aqui'
    }

    findByEmail(email) {
        return ''
    }

    createOne(user) {
        return ''
    }
}

export default BaseEntity
