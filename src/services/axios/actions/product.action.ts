import { Product, Menu, ProductComment } from '~/interfaces/product.type'
import axios from 'axios'
import server from '../server'
import { rejects } from 'assert'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

// fetch all of products
export const getProducts = () => {
    return new Promise<Product[]>(async (resolve, reject) => {
        try {
            const res = await axios.get(`${baseUrl}/dishes`)
            const products = res.data.data as Product[]
            resolve(products)
        } catch (err) {
            reject(err)
        }
    })
}

export const getProductByPagination = (page: number, perPage: number) => {
    return new Promise<Product[]>(async (resolve, rejects) => {
        try {
            const res = await server(`/dishes/pagination?page=${page}&perPage=${perPage}`, {
                cache: 'no-store',
            })
            const products: Product[] = res.data.dishes as Product[]
            resolve(products)
        } catch (err) {
            rejects(err)
        }
    })
}

// fetch menu
export const getMenu = () => {
    return new Promise<Menu[]>(async (resolve, reject) => {
        try {
            const res = await server('/menus', { cache: 'no-store' })
            const menu: Menu[] = res.data as Menu[]
            resolve(menu)
        } catch (err) {
            reject(err)
        }
    })
}

//fetch product by slugName
export const getProductBySlugname = (slug: string) => {
    return new Promise<Product>(async (resolve, reject) => {
        try {
            const res = await server(`/dishes/slug/${slug}`, { cache: 'no-store' })
            const product: Product = res.data as Product
            resolve(product)
        } catch (err) {
            reject(err)
        }
    })
}

//fetch relative products
export const getRelativeProducts = (id: string, quantity: number) => {
    return new Promise<Product[]>(async (resolve, reject) => {
        try {
            const res = await server(`/dishes/relative/${id}?number=${quantity}`, {
                cache: 'no-store',
            })
            const products: Product[] = res.data as Product[]
            resolve(products)
        } catch (err) {
            reject(err)
        }
    })
}

//fetch all comments of product
export const getProductComments = (id: string) => {
    return new Promise<ProductComment[]>(async (resolve, reject) => {
        try {
            const res = await server(`/dishes/comments/${id}`, { cache: 'no-store' })
            const comments = res.data as ProductComment[]
            resolve(comments)
        } catch (err) {
            reject(err)
        }
    })
}
