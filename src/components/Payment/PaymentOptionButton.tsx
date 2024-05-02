'use client'
import React, { useState } from 'react'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import style from '~/styles/payment.module.scss'

interface ChildProps {
    isShip: boolean
    isPayDirected: boolean
    updateStateTrue: () => void
    updateStateFalse: () => void
}

const PaymentOptionButtons: React.FC<ChildProps> = ({
    isShip,
    isPayDirected,
    updateStateTrue,
    updateStateFalse,
}) => {
    const setPayDirectFalse = () => {
        updateStateFalse()
    }
    const setPayDirectTrue = () => {
        updateStateTrue()
    }
    return (
        <div>
            {!isShip && (
                <div className="flex flex-row gap-3">
                    <button
                        className={`${style.OptionButtons} ${isPayDirected ? style.active : ''}`}
                        onClick={setPayDirectTrue}
                    >
                        <LocalAtmIcon />
                        <p>Trả tiền mặt trực tiếp tại quán</p>
                    </button>
                    <button
                        className={`${style.OptionButtons} ${!isPayDirected ? style.active : ''}`}
                        onClick={setPayDirectFalse}
                    >
                        <QrCodeScannerIcon />
                        <p>Thanh toán qua VNPay</p>
                    </button>
                </div>
            )}
            {isShip && (
                <div className="flex flex-row gap-3">
                    <button
                        className={`${style.OptionButtons} ${!isPayDirected ? style.active : ''}`}
                        onClick={setPayDirectFalse}
                    >
                        <QrCodeScannerIcon />
                        <p>Thanh toán qua VNPay</p>
                    </button>
                    <button
                        className={`${style.OptionButtons} ${isPayDirected ? style.active : ''}`}
                        onClick={setPayDirectTrue}
                    >
                        <LocalAtmIcon />
                        <p>Thanh toán khi nhận hàng</p>
                    </button>
                </div>
            )}
        </div>
    )
}

export default PaymentOptionButtons
