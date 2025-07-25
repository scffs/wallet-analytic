export default defineNuxtRouteMiddleware(async (to) => {
  if (to.meta.public) {
    return
  }

  const auth = useAuthStore()

  if (!auth.isAuthenticated) {
    if (to.path !== '/') {
      return navigateTo('/', { replace: true })
    }
  }
})
