import blogEndpoint from '~/services/axios/endpoints/blog.endpoint'
import server from '~/services/axios/server'
import type { Blogs } from '~/interfaces/blog.type'

export function getBlogs() {
    return new Promise<Blogs>(async (resolve, reject) => {
        try {
            const res = await server(blogEndpoint.blog, { cache: 'no-store' })
            const data = res.data as Blogs
            resolve(data)
        } catch (error) {
            // throw new Error()
            reject(error)
        }
    })
}
