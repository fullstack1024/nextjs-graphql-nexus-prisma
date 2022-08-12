import path from "path"
import { ApolloServer } from 'apollo-server-micro'
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import { NextApiHandler } from 'next'
import cors from 'micro-cors'
import { makeSchema } from "nexus"
import * as allTypes from '../../schema'
import prisma from '../../lib/prisma'

export const config = {
  api: {
    bodyParser: false,
  },
}

let apolloServerHandler: NextApiHandler
const schema = makeSchema({
  types: allTypes,
  sourceTypes: {
    modules: [{ module: '.prisma/client', alias: 'PrismaClient' }],
  },
  contextType: {
    module: path.join(process.cwd(), 'context.ts'),
    export: 'Context',
  },
  outputs: {
    typegen: path.join(process.cwd(), 'generated/nexus-typegen.d.ts'),
    schema: path.join(process.cwd(), 'generated/schema.graphql'),
  },
  shouldExitAfterGenerateArtifacts: Boolean(process.env.NEXUS_SHOULD_EXIT_AFTER_REFLECTION),
})

async function getApolloServerHandler() {
  const apolloServer = new ApolloServer({
    schema,
    context: () => ({ prisma }),
    plugins: [
      // 接口文档页配置
      // process.env.NODE_ENV === "production"
      //   ? ApolloServerPluginLandingPageProductionDefault({
      //     graphRef: "my-graph-id@my-graph-variant",
      //     footer: false,
      //   })
      //   : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
      ApolloServerPluginLandingPageGraphQLPlayground()
    ],
  });
  if (!apolloServerHandler) {
    await apolloServer.start()

    apolloServerHandler = apolloServer.createHandler({
      path: '/api/graphql',
    })
  }

  return apolloServerHandler
}

const handler: NextApiHandler = async (req, res) => {
  const apolloServerHandler = await getApolloServerHandler()

  if (req.method === 'OPTIONS') {
    res.end()
    return
  }

  return apolloServerHandler(req, res)
}

export default cors()(handler)
