import {
  type ThemeParams,
  emitEvent,
  mockTelegramEnv,
  retrieveLaunchParams,
  themeParamsState,
} from '@telegram-apps/sdk-vue'

export function mockMacOs() {
  let firstThemeSent = false

  // Telegram for macOS has a ton of bugs, including cases, when the client doesn't
  // even response to the "web_app_request_theme" method. It also generates an incorrect
  // event for the "web_app_request_safe_area" method.
  mockTelegramEnv({
    onEvent([event], next) {
      if (event === 'web_app_request_theme') {
        let tp: ThemeParams = {}

        if (firstThemeSent) {
          tp = themeParamsState()
        } else {
          firstThemeSent = true
          tp ||= retrieveLaunchParams().tgWebAppThemeParams
        }

        // eslint-disable-next-line @typescript-eslint/naming-convention
        return emitEvent('theme_changed', { theme_params: tp })
      }

      if (event === 'web_app_request_safe_area') {
        return emitEvent('safe_area_changed', {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        })
      }

      next()
    },
  })
}
