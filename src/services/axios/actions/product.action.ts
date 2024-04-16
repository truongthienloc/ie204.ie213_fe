import { Product, Menu } from '~/interfaces/product.type'
import axios from 'axios'

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

// fetch menu
export const getMenu = () => {
    return new Promise<Menu[]>(async (resolve, reject) => {
        try {
            const res = await axios.get(`${baseUrl}/menus`)
            const menu = res.data.data as Menu[]
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
            const res = await axios.get(`${baseUrl}/dishes/slug/${slug}`)
            const product: Product = res.data.data as Product
            resolve(product)
        } catch (err) {
            reject(err)
        }
    })
}
