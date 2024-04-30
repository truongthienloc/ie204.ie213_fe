'use client'
import { useEffect, useState } from 'react'
import { Table } from '~/interfaces/table.type'
import Link from 'next/link'
import { getUserTableOrder } from '~/services/axios/actions/user.action'
import styles from '~/styles/user.module.scss'
import dayjs from 'dayjs'

function TableOrderPage() {
    const [table, setTable] = useState<Table | null>()

    useEffect(() => {
        const fetchUserTables = async () => {
            const table = await getUserTableOrder()
            if (table) setTable(table)
            else setTable(null)
        }
        fetchUserTables()
    }, [])

    return (
        <>
            <h1 className={styles.heading}>Thông tin đặt bàn</h1>
            <div className="mt-4">
                {table ? (
                    <>
                        <div className={styles['table_content']}>
                            <div>
                                <span>Mã đặt bàn</span>
                                <span className={styles['user_info']}>{table?._id}</span>
                            </div>
                            <div>
                                <span>Vị trí</span>
                                <span className={styles['user_info']}>
                                    {table?.tablePosition + ' - ' + table?.tableFloor}
                                </span>
                            </div>
                            <div>
                                <span>Ngày đặt bàn</span>
                                <span className={styles['user_info']}>
                                    {dayjs(table?.createdAt).format('DD/MM/YYYY')}
                                </span>
                            </div>
                            <div>
                                <span>Giờ đặt bàn</span>
                                <span className={styles['user_info']}>
                                    {table?.user?.bookingTime}
                                </span>
                            </div>
                            <div>
                                <span>Trạng thái</span>
                                <span className={styles['user_info']}>{table?.tableStatus}</span>
                            </div>
                            <p>* Lưu ý: Bàn sẽ bị hủy nếu bạn đến trễ quá 30 phút!</p>
                        </div>
                    </>
                ) : (
                    <div className="flex h-[400px] flex-col items-center justify-center gap-4">
                        <span>Bạn chưa có thông tin đặt bàn</span>
                        <Link href="/reservation" className={styles.btn}>
                            Đặt bàn ngay
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default TableOrderPage
