'use client'

import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import { toast } from 'react-toastify'
import useBlog from '~/hooks/useBlog.hook'
import blogAction from '~/services/axios/actions/blog.action'
import { validateBlogData } from '~/helpers/validators/blog.validator'
import { useRouter } from 'next/navigation'

const FroalaEditorComponent = dynamic(() => import('~/components/Froala/FroalaEditorComponent'))

type Props = {}

const froalaConfig = {
    placeholderText: 'Edit Your Content Here!',
    saveInterval: 2500,
}

const MAX_TITLE = 70
const MAX_DESCRIPTION = 160

export default function BlogCreatingPage({}: Props) {
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
    } = useBlog()
    const [keyword, setKeyword] = useState('')
    const router = useRouter()

    const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key !== 'Enter') {
            return
        }

        if (keywords.some((key) => key === keyword)) {
            toast.error('Keyword đã tồn tại')
            return
        }

        setKeyword('')
        setKeywords([...keywords, keyword])
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
            blogImages: [],
        }
        if (!validateBlogData(blogData)) {
            toast.error('Invalid blog')
        }

        try {
            const res = await toast.promise(blogAction.postNewBlog(blogData), {
                pending: 'Đang đăng bài',
                success: 'Đăng bài thành công',
                error: 'Đăng bài thất bại',
            })

            router.push('/admin/blog')
        } catch (error) {}
    }

    return (
        <div className="container flex flex-col gap-4 pt-4">
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
                >
                    Đăng bài
                </button>
            </div>
        </div>
    )
}
