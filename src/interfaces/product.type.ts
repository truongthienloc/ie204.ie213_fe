type ProductImage = {
    _id: string
    id?: string
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
