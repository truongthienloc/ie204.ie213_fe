import blogEndpoint from '~/services/axios/endpoints/blog.endpoint'
import server from '~/services/axios/server'
import type { Blog, Blogs } from '~/interfaces/blog.type'

export function getBlogs() {
    return new Promise<Blogs>(async (resolve, reject) => {
        try {
            const res = await server(blogEndpoint.blog, { cache: 'no-store' })
            const data = (await res.data) as Blogs
            resolve(data)
        } catch (error) {
            // throw new Error()
            reject(error)
        }
    })
}

export async function getBlogDetail(slug: string) {
    return new Promise<Blog>(async (resolve, reject) => {
        try {
            const res = await server(`/posts/slug/${slug}`, { cache: 'no-store' })
            const blog = res.data
            resolve(blog)
        } catch (error) {
            reject(error)
        }
    })
}
