import { Elysia } from 'elysia'

import { corsPlugin, openTelemetryPlugin, swaggerPlugin } from './plugins'

import { loggerPlugin } from './config/logger'
import { env } from './config/env'
import { baseErrorHandler, handleValidationError } from './config/errorHandler'

import { authModule } from './modules/auth'

const app = new Elysia()
  .use(loggerPlugin)
  .use(openTelemetryPlugin)
  .use(corsPlugin)
  .use(swaggerPlugin)
  .onError(({ error, code }) => {
    if (code === 'VALIDATION') {
      return handleValidationError(error)
    }

    return baseErrorHandler(error, code)
  })
  .get('/health', 'Hello Elysia')
  .use(authModule)
  .listen({
    port: env.APP_PORT,
    // tls: {
    //   key: Bun.file("./key.pem"),
    //   cert: Bun.file("./cert.pem"),
    // }
  })

console.log(`🦊 Server running at ${app.server?.url}`)

export type App = typeof app
