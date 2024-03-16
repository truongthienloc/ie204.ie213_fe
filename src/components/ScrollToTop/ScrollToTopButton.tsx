'use client'

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import React, { useEffect, useState } from 'react'

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }
        // document.body.addEventListener('scroll', handleScroll, { capture: true })
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
                    className="w-10 h-10 rounded-[50%] bg-primary fixed bottom-6 right-6 animate-fadeIn outline-none grid place-items-center p-0 hover:border-none focus:outline-none focus-visible:outline-none"
                    id="scrollToTopBtn"
                    onClick={scrollToTop}
                    // style={{ display: isVisible ? 'block' : 'none' }}
                >
                    <KeyboardArrowUpIcon />
                </button>
            )}
        </>
    )
}

export default ScrollToTopButton
