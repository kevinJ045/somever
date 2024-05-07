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
  const body = await c.req.json();
  const messages = [...body.messages];
  const prompt = body.prompt;
  const data = await c.env.AI.run('@hf/thebloke/neural-chat-7b-v3-1-awq', {
  	// messages,
  	prompt
  });
  return c.body(data.result.response, 200);
})

export default app
