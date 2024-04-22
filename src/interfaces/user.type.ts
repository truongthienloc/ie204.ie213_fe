type UserAvatar = {
    _id: string
    link: string
    publicId?: string
}

export type User = {
    _id: string
    username: string
    email: string
    role: string
    avatar: UserAvatar
    tables?: []
    discounts?: []
    createdAt?: string
    updatedAt?: string
}
