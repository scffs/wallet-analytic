import type { DbType } from '../../database'

import { getById } from './user.get'
import { getOrCreateByTelegramId } from './user.insert'

export class UserRepository {
  constructor(protected db: DbType) {
    this.db = db
  }

  getById = getById
  getOrCreateByTelegramId = getOrCreateByTelegramId
}
