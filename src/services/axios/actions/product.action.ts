import { Product, Menu } from '~/interfaces/product.type'
import server from '../server'
import { api } from '..'

// fetch all of products
export const getProducts = () => {
    return new Promise<Product[]>((resolve) => {
        server('/dishes', { cache: 'no-store' })
            .then((res) => resolve(res.data as Product[]))
            .catch((error) => console.error(error))
    })
}

// fetch menu
export const getMenu = () => {
    return new Promise<Menu[]>((resolve) => {
        server('/menus', { cache: 'no-store' })
            .then((res) => resolve(res.data as Menu[]))
            .catch((err) => console.error(err))
    })
}

//fetch product by slugName
export const getProductBySlugname = (slug: string) => {
    return new Promise<Product>((resolve) => {
        api.get(`/dishes/slug/${slug}`)
            .then((res) => res.data as Product)
            .catch((error) => console.error(error))
    })
}
