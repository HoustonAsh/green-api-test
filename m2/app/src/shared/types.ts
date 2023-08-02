export interface User {
  name: string
  email: string
}

interface WhoWhen {
  createdAt: Date
  createdBy: Partial<User>
  updatedAt?: Date
  updatedBy?: Partial<User>
}

export interface Zone extends WhoWhen {
  name: string
  ancestors: string
}

export interface ListResponse<T> {
  total: number
  page: number
  limit: number
  result: T[]
}
