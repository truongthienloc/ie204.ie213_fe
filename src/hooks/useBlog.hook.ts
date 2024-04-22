import React, { useState, useEffect, useMemo, useCallback } from 'react'
import debounce from 'lodash/debounce'
import type { BlogData, BlogImageData } from '~/interfaces/blog.type'
import type { CloudinaryImage } from '~/interfaces/image.type'

type Props = {
    blog?: BlogData
    isAutoSave?: boolean
}

export default function useBlog({ blog, isAutoSave = true }: Props) {
    const [title, setTitle] = useState(blog?.title ?? '')
    const [header, setHeader] = useState(blog?.header ?? '')
    const [description, setDescription] = useState(blog?.description ?? '')
    const [keywords, setKeywords] = useState<string[]>(blog?.keywords ?? [])
    const [content, setContent] = useState(blog?.content ?? '')
    const [blogImages, setBlogImages] = useState<BlogImageData[]>(blog?.blogImages ?? [])

    const autoSave = useMemo(
        () =>
            debounce(({ title, header, description, keywords, content, blogImages }) => {
                localStorage.setItem(
                    'blog',
                    JSON.stringify({
                        title,
                        header,
                        description,
                        keywords,
                        content,
                        blogImages,
                    }),
                )
            }, 2500),
        [],
    )

    const save = () => {
        localStorage.setItem(
            'blog',
            JSON.stringify({
                title,
                header,
                description,
                keywords,
                content,
                blogImages,
            }),
        )
    }

    const addBlogImage = useCallback(
        (image: CloudinaryImage) => {
            setBlogImages((prev) => {
                const blogImage = {
                    url: image.url,
                    publicId: image.public_id,
                }
                if (!prev || prev.length === 0) {
                    return [blogImage]
                }
                return [...prev, blogImage]
            })
        },
        [setBlogImages],
    )

    const clearAll = () => {
        setTitle('')
        setHeader('')
        setDescription('')
        setKeywords([])
        setContent('')
    }

    useEffect(() => {
        if (isAutoSave) {
            autoSave({ title, header, description, keywords, content, blogImages })
        }
    }, [title, header, description, keywords, content, blogImages, autoSave])

    return {
        title,
        header,
        description,
        keywords,
        content,
        blogImages,
        setTitle,
        setDescription,
        setHeader,
        setKeywords,
        setContent,
        setBlogImages,
        addBlogImage,
        save,
        clearAll,
    }
}
