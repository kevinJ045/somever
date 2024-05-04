import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
   return c.render(<h1>Hello!</h1>)
})


app.get('/ai', async (c) => {
  const request = c.req.raw;
  console.log(request.url);
  const queryParams = request.url.searchParams;
  const messages = queryParams.get('messages');
  return c.body(await env.AI.run('@hf/thebloke/neural-chat-7b-v3-1-awq', {
  	messages,
  	stream: true
  }), 201, {
	'content-type': 'text/event-stream'
  });
})

export default app
