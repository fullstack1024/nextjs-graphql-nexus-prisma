import { objectType } from "nexus"

export const User = objectType({
  name: 'User',
  description: '用户',
  definition(t) {
    t.int('id', { description: 'ID' })
    t.string('name', { description: '姓名' })
    t.string('email', { description: '邮箱' })
    t.list.field('post', {
      type: 'Post',
      resolve: (parent, args, ctx) =>
        ctx.prisma.user
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .posts(),
    })
  },
})
