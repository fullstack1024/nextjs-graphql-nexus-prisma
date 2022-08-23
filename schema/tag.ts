import { objectType } from "nexus"

export const Tab = objectType({
  name: 'Tag',
  description: '标签',
  definition(t) {
    t.int('id', { description: 'ID' })
    t.string('label', { description: '标签名' })
    t.list.field('posts', {
      type: 'Post',
      resolve: (parent, args, ctx) =>
        ctx.prisma.tag
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .posts(),
    })
  },
})
