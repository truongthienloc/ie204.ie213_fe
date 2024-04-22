import type { BlogData, Blogs } from '~/interfaces/blog.type'
import { api } from '..'
import blogEndpoint from '../endpoints/blog.endpoint'

function postNewBlog(blog: BlogData) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await api.post(blogEndpoint.blog, {
                ...blog,
            })

            resolve(res.data)
        } catch (error) {
            reject(error)
        }
    })
}

function updateBlog(id: string, blog: BlogData) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await api.put(`${blogEndpoint.blog}/${id}`, {
                ...blog,
            })

            resolve(res.data)
        } catch (error) {
            reject(error)
        }
    })
}

function deleteBlog(id: string) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await api.delete(`${blogEndpoint.blog}/${id}`)

            resolve(res.data)
        } catch (error) {
            reject(error)
        }
    })
}

function getBlogs() {
    return new Promise<Blogs>(async (resolve, reject) => {
        try {
            const res = await api.get(blogEndpoint.blog)
            const data = res.data.data as Blogs
            resolve(data.reverse())
        } catch (error) {
            reject(error)
        }
    })
}

const blogAction = {
    postNewBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
}

export default blogAction
