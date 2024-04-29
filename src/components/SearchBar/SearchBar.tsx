import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import styles from '~/styles/search.module.scss'
import clsx from 'clsx'

const SearchBar = () => {
    return (
        <div className={clsx('mx-3 flex overflow-hidden rounded-xl border', styles.wrap)}>
            <div className="flex cursor-pointer items-center pl-3">
                <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Search..."
                className={clsx('py-2 pl-3 pr-5 outline-none  ', styles.inputField)}
            />
            {/* <button className="absolute top-0 right-0 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Search
      </button> */}
        </div>
    )
}

export default SearchBar
