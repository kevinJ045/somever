import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

// app.get('/', (c) => {
//   return c.render(<h1>Hello!</h1>)
// })

app.get('/', async (c) => {
  return new Response(await env.AI.run('@hf/thebloke/neural-chat-7b-v3-1-awq', {
  	messages: c.req.param('messages'),
  	stream: true
  }), {
	headers: { 'content-type': 'text/event-stream' },
  });
})

export default app
