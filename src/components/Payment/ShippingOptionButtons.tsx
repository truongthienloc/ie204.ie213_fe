'use client'
import React, { useState } from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import WhereToVoteIcon from '@mui/icons-material/WhereToVote'
import style from '~/styles/payment.module.scss'

interface ChildProps {
    state: boolean
    updateState: () => void
}

const ShippingOptionButtons: React.FC<ChildProps> = ({ state, updateState }) => {
    const handleOnClick = () => {
        updateState()
    }
    return (
        <div className="flex flex-row gap-3">
            <button
                className={`${style.OptionButtons} ${!state ? style.active : ''}`}
                onClick={handleOnClick}
            >
                <WhereToVoteIcon />
                <p>Dùng tại quán</p>
            </button>
            <button
                className={`${style.OptionButtons} ${state ? style.active : ''}`}
                onClick={handleOnClick}
            >
                <LocalShippingIcon />
                <p>Giao hàng tại nhà</p>
            </button>
        </div>
    )
}

export default ShippingOptionButtons
