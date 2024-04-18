import React, { useState, useEffect } from 'react'

export default function useBlog() {
    const [title, setTitle] = useState('')
    const [header, setHeader] = useState('')
    const [description, setDescription] = useState('')
    const [keywords, setKeywords] = useState<string[]>([])
    const [content, setContent] = useState('')

    const save = () => {
        localStorage.setItem(
            'blog',
            JSON.stringify({
                title,
                header,
                description,
                keywords,
                content,
            }),
        )
    }

    return {
        title,
        header,
        description,
        keywords,
        content,
        setTitle,
        setDescription,
        setHeader,
        setKeywords,
        setContent,
        save,
    }
}
