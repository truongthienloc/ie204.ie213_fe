'use client'

import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import React, { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import { toast } from 'react-toastify'
import useBlog from '~/hooks/useBlog.hook'
import blogAction from '~/services/axios/actions/blog.action'
import { validateBlogData } from '~/helpers/validators/blog.validator'
import generateFroalaConfig from '~/components/Froala/froala.config'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import blogImageEvent from '~/services/EventEmitter/blogImage.event'
// import type { BlogImageData } from '~/interfaces/blog.type'
import type { CloudinaryImage } from '~/interfaces/image.type'
import type { Blog } from '~/interfaces/blog.type'

const FroalaEditorComponent = dynamic(() => import('~/components/Froala/FroalaEditorComponent'))

type Props = {
    instanceBlog?: Blog
    isAutoSave?: boolean
    isEdit?: boolean
}

const MAX_TITLE = 70
const MAX_DESCRIPTION = 160

export default function WriteBlogForm({ instanceBlog, isAutoSave = true, isEdit = false }: Props) {
    const {
        title,
        setTitle,
        header,
        setHeader,
        description,
        setDescription,
        keywords,
        setKeywords,
        content,
        setContent,
        blogImages,
        setBlogImages,
        addBlogImage,
        clearAll,
    } = useBlog({ blog: instanceBlog, isAutoSave })
    const [keyword, setKeyword] = useState('')
    const router = useRouter()

    const froalaConfig = useMemo(() => generateFroalaConfig(), [])

    useEffect(() => {
        if (isAutoSave) {
            const blog = localStorage.getItem('blog')
            if (!blog) return
            const blogData = JSON.parse(blog)
            setTitle(blogData.title)
            setHeader(blogData.header)
            setDescription(blogData.description)
            setKeywords(blogData.keywords)
            setContent(blogData.content)
            setBlogImages(blogData.blogImages)
        }
    }, [setTitle, setHeader, setDescription, setKeywords, setContent, setBlogImages])

    // Handle make "blogImages" field for submit
    useEffect(() => {
        const handleImageUploaded = (image: CloudinaryImage) => {
            addBlogImage(image)
        }
        blogImageEvent.on('uploaded', handleImageUploaded)

        return () => {
            blogImageEvent.off('uploaded', handleImageUploaded)
        }
    }, [addBlogImage])

    const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key !== 'Enter') {
            return
        }

        const result: string[] = []
        for (const value of keyword.split(',')) {
            const key = value.trim()
            if (keywords.some((curKey) => curKey === key)) {
                toast.error(`Keyword {${key}} đã tồn tại`)
                continue
            }

            result.push(key)
        }

        setKeyword('')
        setKeywords([...keywords, ...result])
    }

    const handleDeleteKeyword = (keyword: string) => {
        const newKeywords = keywords.filter((key) => key !== keyword)
        setKeywords(newKeywords)
    }

    const handleSubmit = async () => {
        const blogData = {
            title: title,
            header: header,
            description: description,
            keywords: keywords,
            content: content,
            blogImages: blogImages,
            thumbnailImage: blogImages[0]?.url || '/images/bepuit_logo.svg',
        }
        if (!validateBlogData(blogData)) {
            toast.error('Invalid blog')
        }

        try {
            if (isEdit && instanceBlog) {
                const res = await toast.promise(blogAction.updateBlog(instanceBlog._id, blogData), {
                    pending: 'Đang đăng bài',
                    success: 'Đăng bài thành công', // Post success
                    error: 'Đăng bài thất bại',
                })
            } else {
                const res = await toast.promise(blogAction.postNewBlog(blogData), {
                    pending: 'Đang đăng bài',
                    success: 'Đăng bài thành công', // Post success
                    error: 'Đăng bài thất bại',
                })
            }
            if (isAutoSave) {
                localStorage.removeItem('blog')
            }
            router.push('/admin/blog')
        } catch (error) {}
    }

    const handleClearAll = () => {
        clearAll()
    }

    return (
        <div className="container flex flex-col gap-4 py-4">
            <div className="flex flex-row justify-end">
                <button
                    className="flex flex-row items-center gap-2 rounded-sm border border-black bg-white px-4 py-2 text-black shadow-md"
                    onClick={handleClearAll}
                >
                    <ClearAllIcon />
                    <span>Clear All</span>
                </button>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-lg">
                    Title
                </label>
                <TextField
                    className="w-full"
                    placeholder="Tiêu đề"
                    inputProps={{
                        maxLength: MAX_TITLE,
                    }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    helperText={`${title.length}/${MAX_TITLE}`}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-lg">
                    Header
                </label>
                <TextField
                    className="w-full"
                    placeholder="Tên bài"
                    multiline
                    value={header}
                    onChange={(e) => setHeader(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-lg">
                    Description
                </label>
                <TextField
                    multiline
                    className="w-full"
                    placeholder="Mô tả"
                    inputProps={{
                        maxLength: MAX_DESCRIPTION,
                    }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    helperText={`${description.length}/${MAX_DESCRIPTION}`}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-lg">
                    Keywords
                </label>
                <TextField
                    className="w-full"
                    placeholder="Từ khóa"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeywordKeyDown}
                />
                <div className="flex w-full flex-row flex-wrap gap-1">
                    {keywords.length > 0 &&
                        keywords.map((key) => (
                            <Chip
                                color="primary"
                                key={key}
                                label={key}
                                onDelete={() => handleDeleteKeyword(key)}
                            />
                        ))}
                </div>
            </div>

            <FroalaEditorComponent
                tag="textarea"
                config={froalaConfig}
                model={content}
                onModelChange={(e: string) => setContent(e)}
            />

            <div className="flex flex-row items-center">
                <button
                    className="rounded-md bg-primary px-3 py-2 text-white"
                    onClick={handleSubmit}
                    type="button"
                >
                    {isEdit ? 'Đăng lại' : 'Đăng bài'}
                </button>
            </div>
        </div>
    )
}
