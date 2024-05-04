import { Hono } from 'hono'
import { renderer } from './renderer'


type Bindings = { R2: R2Bucket, AI: Ai };
const app = new Hono<{ Bindings: Bindings }>();

interface Env {
	AI: Ai
}

app.use(renderer)

app.get('/', (c) => {
   return c.render(<h1>Hello!</h1>)
})


app.post('/ai', async (c) => {
  const body = c.req.parseBody();
  const queryParams = new URL(request.url).searchParams;
  const messages = [...body.system, ...body.user];
  return c.body(await c.env.AI.run('@hf/thebloke/neural-chat-7b-v3-1-awq', {
  	messages,
  	stream: true
  }), 201, {
	'content-type': 'text/event-stream'
  });
})

export default app
