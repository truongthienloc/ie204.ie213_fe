import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import styles from '~/styles/search.module.scss'
import clsx from 'clsx'

import { useRouter } from 'next/navigation'

const SearchBox = () => {
    const [text, setText] = useState('')
    const router = useRouter()

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            router.push(`/search?keyword=${text}`)
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    return (
        <div
            className={clsx('flex overflow-hidden rounded-xl border border-secondary', styles.wrap)}
        >
            <div className="flex cursor-pointer items-center pl-3">
                <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                value={text}
                placeholder="Search..."
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className={clsx('py-2 pl-3 pr-2 outline-none')}
            />
        </div>
    )
}

export default SearchBox
