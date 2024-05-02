export type ProductImage = {
    _id: string
    id: string
    link: string
}

export type Product = {
    _id: string
    dishName: string
    dishPrice: number
    totalOrder?: number
    dishDescription: string
    menuId: string
    rating?: number
    dishImages: ProductImage[]
    slugName: string
    createdAt?: string
    updatedAt?: string
}

export type Menu = {
    _id: string
    menuName: string
}

export type ProductComment = {
    _id?: string
    content: string
    userId: string
    dishId: string
    rating: number
    level: number
    replies?: ProductComment[]
    createdAt?: string
    updatedAt?: string
}
