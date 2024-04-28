'use client'
import styles from '~/styles/user.module.scss'
import { getCurrentUser } from '~/services/axios/actions/user.action'
import { useEffect, useState } from 'react'

function DiscountPage() {
    const [discounts, setDiscounts] = useState([])

    useEffect(() => {
        const fetchUserDiscounts = async () => {
            const user = await getCurrentUser()
            if (user.discounts?.length) setDiscounts(user.discounts)
            else setDiscounts([])
        }
        fetchUserDiscounts()
    }, [])

    return (
        <>
            <h1 className={styles.heading}>Mã giảm giá - ưu đãi dành cho bạn</h1>
            <div className="mt-4">
                {!discounts?.length ? (
                    <p className="text-md text-center">Bạn chưa có mã giảm giá nào</p>
                ) : (
                    <></>
                    // discounts.map((discount) => <div key={discount?.code}></div>)
                )}
            </div>
        </>
    )
}

export default DiscountPage
