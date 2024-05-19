import { MetadataRoute } from 'next'
import { getBlogs } from './(default)/blog/action'
import { getProductsFromServer } from '~/services/axios/actions/product.action'
import { url } from 'inspector'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const blogs = await getBlogs()
    const products = await getProductsFromServer()

    return [
        {
            url: 'https://bepuit.com',
            lastModified: new Date(),
            priority: 1,
        },
        {
            url: 'https://bepuit.com/product',
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: 'https://bepuit.com/reservation',
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: 'https://bepuit.com/blog',
            lastModified: new Date(),
            priority: 0.9,
        },
        {
            url: 'https://bepuit.com/about',
            lastModified: new Date(),
            priority: 0.8,
        },
        ...products.map((product) => ({
            url: 'https://bepuit.com/product/' + product?.slugName,
            lastModified: new Date(),
            priority: 0.64,
        })),
        ...blogs.map((blog) => ({
            url: 'https://bepuit.com/blog/' + blog?.slugName,
            lastModified: new Date(),
            priority: 0.64,
        })),
    ]
}
