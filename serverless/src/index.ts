// export interface Env {

// }

// export default {
// 	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
// 		return new Response("HELLO WORLD");
// 		// if(request.method=="GET"){
// 		// 	return Response.json({
// 		// 		message:"You sent a get request",
// 		// 	})
// 		// }
// 		// else{
// 		// 	return Response.json({
// 		// 		message:"You havent sent a get request"
// 		// 	})
// 		// }
// 	}
// };

import { Hono, Next } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'

const app = new Hono()

app.post('/', async (c) => {
  // Todo add zod validation here
  const body: {
    name: string;
    email: string;
    password: string
  } = await c.req.json()
  const { CONNECTIONPOOL_URL } = env<{ CONNECTIONPOOL_URL: string }>(c)

  const prisma = new PrismaClient({
      datasourceUrl: CONNECTIONPOOL_URL,
  }).$extends(withAccelerate())

  console.log(body)

  await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password
    }
  })
  
  return c.json({msg: "as"})
})

export default app
