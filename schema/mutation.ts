import { mutationType, nonNull, stringArg } from "nexus"

export const Mutation = mutationType({
  definition(t) {
    t.field('signupUser', {
      type: 'User',
      description: '用户登录',
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
      },
      resolve: (_, { name, email }, ctx) => {
        return ctx.prisma.user.create({
          data: {
            name,
            email,
          },
        })
      },
    })

    t.nullable.field('deletePost', {
      type: 'Post',
      description: '删除 帖子',
      args: {
        postId: stringArg(),
      },
      resolve: (_, { postId }, ctx) => {
        return ctx.prisma.post.delete({
          where: { id: Number(postId) },
        })
      },
    })

    t.field('createDraft', {
      type: 'Post',
      description: '创建 帖子草稿',
      args: {
        title: nonNull(stringArg()),
        content: stringArg(),
        authorEmail: stringArg(),
      },
      resolve: (_, { title, content, authorEmail }, ctx) => {
        return ctx.prisma.post.create({
          data: {
            title,
            content,
            published: false,
            author: {
              connect: { email: authorEmail },
            },
          },
        })
      },
    })

    t.nullable.field('publish', {
      type: 'Post',
      description: '修改 发布帖子',
      args: {
        postId: stringArg(),
      },
      resolve: (_, { postId }, ctx) => {
        return ctx.prisma.post.update({
          where: { id: Number(postId) },
          data: { published: true },
        })
      },
    })
  },
})
