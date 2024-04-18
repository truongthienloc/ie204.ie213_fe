import type { Image } from './image.type'

export type User = {
    _id: string
    username: string
    email: string
    role: string
    avatar: Image
    createdAt: string
    updatedAt: string
}
