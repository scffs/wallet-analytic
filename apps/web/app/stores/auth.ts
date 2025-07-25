import { defineStore } from 'pinia'

import { type TMAUser } from '@wallet-analytic/shared'

import { client } from '~/shared/api'

interface AuthState {
  user: TMAUser | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.user,
  },

  actions: {
    async initialize(): Promise<void> {
      if (!import.meta.client) {
        return
      }

      this.loading = true
      this.error = null

      try {
        await new Promise((resolve) => setTimeout(resolve, 3_000))
        const { data: user } = await client.auth.login.get()

        if (user) {
          this.user = user
        }
      } catch (err) {
        this.error =
          err instanceof Error ? err.message : 'Unknown error occurred'
      } finally {
        this.loading = false
      }
    },
  },
})
