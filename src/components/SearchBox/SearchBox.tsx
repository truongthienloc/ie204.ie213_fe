import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

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
        <div className="flex w-[100%] overflow-hidden rounded-xl border border-secondary">
            <div className="flex cursor-pointer items-center pl-3">
                <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                value={text}
                placeholder="Search..."
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-[100%] py-2 pl-3 pr-2 outline-none"
            />
        </div>
    )
}

export default SearchBox
