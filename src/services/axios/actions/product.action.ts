import { Product, Menu } from '~/interfaces/product.type'
import server from '../server'
import { api } from '..'

// fetch all of products
export const getProducts = () => {
    return new Promise<Product[]>((resolve, reject) => {
        server('/dishes', { cache: 'no-store' })
            .then((res) => resolve(res.data as Product[]))
            .catch((error) => reject(error))
    })
}

// fetch menu
export const getMenu = () => {
    return new Promise<Menu[]>((resolve, reject) => {
        server('/menus', { cache: 'no-store' })
            .then((res) => resolve(res.data as Menu[]))
            .catch((err) => reject(err))
    })
}

//fetch product by slugName
export const getProductBySlugname = (slug: string) => {
    return new Promise<Product>((resolve, reject) => {
        api.get(`/dishes/slug/${slug}`)
            .then((res) => res.data as Product)
            .catch((error) => reject(error))
    })
}
