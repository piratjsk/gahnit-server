export const resolver = {
  // Queries
  Query: {
    customers(parent, args, ctx, info) {
      return ctx.db.query.customers({orderBy: 'createdAt_DESC'}, info)
    },
    customer(parent, { id }, ctx, info) {
      return ctx.db.query.customer({ where: { id } }, info)
    }
  },

  // Mutations
  Mutation: {
    async createCustomer(parent, { name, nip, address }, ctx, info) {
      return ctx.db.mutation.createCustomer(
        {
          data: {
            name,
            nip,
            address: {
              create: {
                country: address.country,
                city: address.city,
                street: address.street,
                building: address.building,
                postCode: address.postCode,
                postDepartment: address.postDepartment
              }
            }
          }
        },
        info
      )
    },
    updateCustomer(parent, {id, name, nip, address}, ctx, info) {
      return ctx.db.mutation.updateCustomer(
        {
          data: {
            name,
            nip,
            address: {
              update: address
            }
          },
          where: { id }
        },
        info
      )
    },
    deleteCustomer(parent, { id }, ctx, info) {
      return ctx.db.mutation.deleteCustomer({ where: { id } })
    }
  }
}