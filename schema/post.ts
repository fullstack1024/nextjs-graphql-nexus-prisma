import { objectType } from "nexus"

export const Post = objectType({
  name: 'Post',
  description: '帖子',
  definition(t) {
    t.int('id', { description: 'ID' })
    t.string('title', { description: '标题' })
    t.nullable.string('content', { description: '内容' })
    t.boolean('published', { description: '是否已发布' })
    t.nullable.field('author', {
      type: 'User',
      resolve: (parent, args, ctx) =>
        ctx.prisma.post
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .author(),
    })
    t.list.field('tags', {
      type: 'Tag',
      resolve: (parent, args, ctx) =>
        ctx.prisma.post
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .tags(),
    })
  },
})
