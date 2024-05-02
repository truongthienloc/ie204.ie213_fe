'use client'
import React, { useState } from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import WhereToVoteIcon from '@mui/icons-material/WhereToVote'
import style from '~/styles/payment.module.scss'

interface ChildProps {
    state: boolean
    updateStateTrue: () => void
    updateStateFalse: () => void
}

const ShippingOptionButtons: React.FC<ChildProps> = ({
    state,
    updateStateTrue,
    updateStateFalse,
}) => {
    const setShipFalse = () => {
        updateStateFalse()
    }
    const setShipTrue = () => {
        updateStateTrue()
    }
    return (
        <div className="flex flex-row gap-3">
            <button
                className={`${style.OptionButtons} ${!state ? style.active : ''}`}
                onClick={setShipFalse}
            >
                <WhereToVoteIcon />
                <p>Dùng tại quán</p>
            </button>
            <button
                className={`${style.OptionButtons} ${state ? style.active : ''}`}
                onClick={setShipTrue}
            >
                <LocalShippingIcon />
                <p>Giao hàng tại nhà</p>
            </button>
        </div>
    )
}

export default ShippingOptionButtons
