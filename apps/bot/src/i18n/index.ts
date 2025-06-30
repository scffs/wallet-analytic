import { createMtcuteI18n } from '@mtcute/i18n'
import { en } from './en.js'
import { ru } from './ru.js'

export const tr = createMtcuteI18n({
  primaryLanguage: {
    name: 'en',
    strings: en,
  },
  otherLanguages: { ru },
})
