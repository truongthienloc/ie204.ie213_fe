import { Product, Menu, ProductComment } from '~/interfaces/product.type'
import axios from 'axios'
import server from '../server'
import useDish from '~/hooks/useDish.hook'
import { api } from '..'
import productEndpoint from '../endpoints/product.endpoint'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

type NonMethodNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

type NonMethodObject<T> = Pick<T, NonMethodNames<T>>

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

export function postProduct(dishInfo: NonMethodObject<ReturnType<typeof useDish>>) {
    return new Promise(async (resolve, reject) => {
        try {
            const formData = new FormData()
            formData.append('dishName', dishInfo.name)
            formData.append('menuId', dishInfo.kind)
            formData.append('dishPrice', dishInfo.price.toString())
            formData.append('dishDescription', dishInfo.description)

            for (const image of dishInfo.imageFiles) {
                console.log(image)
                formData.append('images', image)
            }

            const res = await api.post(productEndpoint.product, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            resolve(res.data)
        } catch (error) {
            reject(error)
        }
    })
}

export function putProduct(dishInfo: NonMethodObject<ReturnType<typeof useDish>>) {
    return new Promise(async (resolve, reject) => {
        try {
            // const formData = new FormData()
            // formData.append('dishName', dishInfo.name)
            // formData.append('menuName', dishInfo.kind)
            // formData.append('dishPrice', dishInfo.price.toString())
            // formData.append('dishDescription', dishInfo.description)
            // for (const image of dishInfo.imageFiles) {
            // 	formData.append('images', image)
            // }

            // // if (dishInfo.deletedImages.length > 0) {
            // //     await Promise.all(
            // //         dishInfo.deletedImages.map(async (image) => {
            // //             console.log(image)
            // //             await api.delete(`/dish/images/${image.id}`)
            // //         })
            // //     )
            // // }

            // const res = await api.put(`${productEndpoint.product}/${dishInfo.id}`, formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            // })

            const res = await api.put(`${productEndpoint.product}/${dishInfo.id}`, {
                dishName: dishInfo.name,
                dishPrice: parseInt(dishInfo.price),
                dishDescription: dishInfo.description,
                menuId: dishInfo.kind,
                dishImages: dishInfo.imgs,
            })

            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export function deleteProduct(products: Product[]) {
    return new Promise(async (resolve, reject) => {
        try {
            const promises = products.map(async (dish) => {
                await api.delete(`${productEndpoint.product}/${dish._id}`)
            })

            const res = await Promise.all(promises)
            resolve(res)
        } catch (error) {
            reject(error)
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
