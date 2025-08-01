import { ValidationError } from 'elysia'

import type { ValidationErrorResponse } from '../../errors'

export const handleValidationError = (
  error: Readonly<ValidationError>,
): { error: ValidationErrorResponse } => {
  if (!Array.isArray(error?.all)) {
    return {
      error: {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        errors: [],
      },
    }
  }

  const errorList = error.all.map((err) => {
    if (!err.summary) {
      return {
        path: 'Unknown',
        message: 'Unknown',
        summary: 'Unknown',
        errors: [],
      }
    }

    return {
      path: err.path?.replace(/^\//, '') || '',
      message: err.message,
      summary: err.summary,
      errors: err.errors,
    }
  })

  return {
    error: {
      status: 422,
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      errors: errorList,
    },
  }
}
