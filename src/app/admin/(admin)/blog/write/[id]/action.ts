// import { cookies } from "next/headers"
import { Blog } from '~/interfaces/blog.type'
import server from '~/services/axios/server'

export function getBlog(id: string) {
    return new Promise<Blog>(async (resolve, reject) => {
        try {
            const res = await server(`/posts/${id}`, { cache: 'no-store' })
            const data = res.data as Blog
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}
