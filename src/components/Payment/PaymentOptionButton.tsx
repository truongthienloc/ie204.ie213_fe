'use client'
import React, { useState } from 'react'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import style from '~/styles/payment.module.scss'

interface ChildProps {
    state: boolean
    conditionState: boolean
    updateState: () => void
}

const PaymentOptionButtons: React.FC<ChildProps> = ({ state, conditionState, updateState }) => {
    const handleOnClick = () => {
        updateState()
    }
    return (
        <div className="flex flex-row gap-3">
            {!conditionState && (
                <button
                    className={`${style.OptionButtons} ${state ? style.active : ''}`}
                    onClick={handleOnClick}
                >
                    <LocalAtmIcon />
                    <p>Trả tiền mặt trực tiếp tại quán</p>
                </button>
            )}
            <button
                className={`${style.OptionButtons} ${!state ? style.active : ''} ${conditionState ? style.active : ''}`}
                onClick={handleOnClick}
            >
                <QrCodeScannerIcon />
                <p>Thanh toán qua VNPay</p>
            </button>
        </div>
    )
}

export default PaymentOptionButtons
