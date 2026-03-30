export type ActionResult<T = void> =
  | {
      success: true
      data: T extends void ? never : T
    }
  | {
      success: false
      error: string
    }
