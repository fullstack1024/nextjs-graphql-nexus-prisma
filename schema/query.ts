import { nonNull, nullable, queryType, stringArg } from "nexus"
import sayHello from "@/utils/sayHello"

export const Query = queryType({
  definition(t) {
    t.field('post', {
      type: 'Post',
      description: '查询 帖子详情',
      args: {
        postId: nonNull(stringArg({description: '帖子ID'})),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.post.findUnique({
          where: { id: Number(args.postId) },
        })
      },
    })

    t.list.field('feed', {
      type: 'Post',
      description: '列表查询 已发布帖子',
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.post.findMany({
          where: { published: true },
        })
      },
    })

    t.list.field('drafts', {
      type: 'Post',
      description: '列表查询 草稿',
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.post.findMany({
          where: { published: false },
        })
      },
    })

    t.list.field('filterPosts', {
      type: 'Post',
      description: '列表查询 过滤帖子',
      args: {
        searchString: nullable(stringArg()),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } },
            ],
          },
        })
      },
    })

    t.field('sayHello', {
      type: "String",
      resolve: (_, { searchString }, ctx) => {
        sayHello();
        return 'hello'
      },
    })
  },
})
