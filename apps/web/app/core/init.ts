import {
  bindThemeParamsCssVars,
  bindViewportCssVars,
  closingBehavior,
  init as initSDK,
  isThemeParamsCssVarsBound,
  isViewportCssVarsBound,
  miniApp,
  mountBackButton,
  mountSettingsButton,
  mountThemeParamsSync,
  restoreInitData,
  retrieveLaunchParams,
  setDebug,
  targetOrigin,
  viewport,
} from '@telegram-apps/sdk-vue'

import { mockMacOs } from '~/core/mockMacOs'

import './mockEnv.ts'

/**
 * Initializes the application and configures its dependencies.
 */
export async function init(): Promise<void> {
  const launchParams = retrieveLaunchParams()

  const debug =
    (launchParams.tgWebAppStartParam || '').includes('platformer_debug') ||
    import.meta.env.DEV

  setDebug(debug)
  targetOrigin.set('https://tgl.mini-apps.store')

  const { tgWebAppPlatform: platform } = launchParams

  initSDK()
  miniApp.ready()

  if (debug && ['ios', 'android'].includes(platform)) {
    void import('eruda').then(({ default: lib }) => {
      lib.init()
      lib.position({ x: window.innerWidth - 50, y: 0 })
    })
  }

  if (platform === 'macos') {
    mockMacOs()
  }

  restoreInitData()

  if (closingBehavior.mount.isAvailable()) {
    closingBehavior.mount()
  }

  if (closingBehavior.enableConfirmation.isAvailable()) {
    closingBehavior.enableConfirmation()
  }

  mountBackButton.ifAvailable()
  mountSettingsButton.ifAvailable()

  mountThemeParamsSync.ifAvailable()

  if (miniApp.isSupported() && !miniApp.isMounted()) {
    miniApp.mountSync()
  }

  const [viewportMounted, data] = viewport.mount.ifAvailable()
  await data

  if (viewportMounted) {
    try {
     await viewport.requestFullscreen()
    } catch (e) {
      // alert(e)
      console.error('requestFullscreen: ', e)
    }

    if (isViewportCssVarsBound()) {
      bindViewportCssVars()
    }
  }

  if (!isThemeParamsCssVarsBound()) {
    bindThemeParamsCssVars()
  }

  const bgColor = miniApp.isDark() ? '#242424' : '#ffeaa166'

  miniApp.setBackgroundColor.ifAvailable(bgColor)
  miniApp.setHeaderColor.ifAvailable(bgColor)
  miniApp.setBottomBarColor.ifAvailable(bgColor)

  const colorMode = useColorMode()
  colorMode.preference = miniApp.isDark() ? 'dark' : 'light'

  console.log('[init] Initialization complete')
}
