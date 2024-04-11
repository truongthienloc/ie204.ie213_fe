'use client'

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import React, { useEffect, useState } from 'react'

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <>
            {isVisible && (
                <button
                    className="fixed bottom-6 right-6 grid h-14 w-14 animate-fadeIn place-items-center rounded-[50%] p-0 outline-none hover:border-none focus:outline-none focus-visible:outline-none"
                    id="scrollToTopBtn"
                    style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                    onClick={scrollToTop}
                >
                    <KeyboardArrowUpIcon
                        style={{ width: '34px', height: '34px', color: 'rgba(0,0,0,0.5)' }}
                    />
                </button>
            )}
        </>
    )
}

export default ScrollToTopButton
