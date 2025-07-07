import { Elysia } from 'elysia'

const app = new Elysia()
  .get('/', () => 'Hello Elysia')
  .get('/health', () => ({ ts: Date.now() }))
  .listen(3001)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
