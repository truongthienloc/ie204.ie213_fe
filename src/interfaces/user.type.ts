import type { Image } from './image.type'

export type User = {
    _id: string
    username: string
    email: string
    role: string
    tables?: []
    discounts?: []
    createdAt?: string
    updatedAt?: string
    avatar: Image
}
