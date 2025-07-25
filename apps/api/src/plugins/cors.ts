import cors from '@elysiajs/cors'
import { Elysia } from 'elysia'

// import { env } from '../config/env'

export const corsPlugin = new Elysia({ name: 'wa-cors' }).use(
  cors({
    origin: '*',
    // origin: env.WEB_APP_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)
