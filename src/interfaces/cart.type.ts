import { ProductImage } from './product.type'

export type CartProduct = {
    _id: string
    dishName: string
    dishPrice: number
    dishImages: ProductImage[]
    dishAmount: number
}
