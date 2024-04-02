export type Product = {
    id: number
    dishName: string
    dishPrice: number
    dishDescription: string
    dishTotalOrder: number
    dishImages: {
        id: number
        link: string
    }[]
    dishRating?: number
    comments?: {
        userId: number
        content: string
    }[]
}
