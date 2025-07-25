import { treaty } from '@elysiajs/eden'
import { retrieveRawInitData } from '@telegram-apps/sdk-vue'

import type { App } from '@wallet-analytic/api'
import { withCatch } from '@wallet-analytic/shared'

const [data] = withCatch(retrieveRawInitData)
export const DEFAULT_WEB_AUTH = data || ''

export const client = treaty<App>('http://localhost:3001', {
  headers: {
    Authorization: `Bearer tma ${DEFAULT_WEB_AUTH}`,
  },
})
