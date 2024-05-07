import { Hono } from 'hono'
import { renderer } from './renderer'


type Bindings = { R2: R2Bucket, AI: Ai };
const app = new Hono<{ Bindings: Bindings }>();

interface Env {
	AI: Ai
}

app.use(renderer)

app.get('/ai', async (c) => {
	return c.render(<div>
		<h1>AI Options</h1>
		<ul>
			<li><code>messages</code>(only if no prompt): An array of <code>{ role: 'system' | 'user', content: 'string' }</code></li>
			<li><code>prompt</code>(only if no messages): A 'string'</li>
			<li><code>model</code>(optional): A 'string' for the model name</li>
		</ul>
	</div>);
});

app.post('/ai', async (c) => {
  const body = await c.req.json();
  const messages = body.messages;
  const prompt = body.prompt;
  let model = body.model || '@hf/thebloke/neural-chat-7b-v3-1-awq';
  const options = prompt ? { prompt } : { messages };
  const data = await c.env.AI.run(model, options);
  return c.body(data.response, 200);
});

export default app
