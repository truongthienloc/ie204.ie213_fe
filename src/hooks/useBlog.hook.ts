import React, { useState, useEffect, useCallback } from 'react'
import debounce from 'lodash/debounce'

export default function useBlog() {
    const [title, setTitle] = useState('')
    const [header, setHeader] = useState('')
    const [description, setDescription] = useState('')
    const [keywords, setKeywords] = useState<string[]>([])
    const [content, setContent] = useState('')

    const autoSave = useCallback(
        debounce(({ title, header, description, keywords, content }) => {
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
            }),
        )
    }

    const clearAll = () => {
        setTitle('')
        setHeader('')
        setDescription('')
        setKeywords([])
        setContent('')
    }

    useEffect(() => {
        autoSave({ title, header, description, keywords, content })
    }, [title, header, description, keywords, content])

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
        clearAll,
    }
}
