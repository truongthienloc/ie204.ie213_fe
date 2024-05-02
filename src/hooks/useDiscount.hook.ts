import { Dayjs } from 'dayjs'
import React, { useState } from 'react'

export default function useDiscount() {
    const [id, setId] = useState('')
    const [discountName, setDiscountName] = useState('')
    const [description, setDescription] = useState('')
    const [percent, setPercent] = useState('')
    const [startDay, setStartDay] = useState<Dayjs | null>()
    const [endDay, setEndDay] = useState<Dayjs | null>()

    const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)
    const handleChangeDiscountName = (e: React.ChangeEvent<HTMLInputElement>) =>
        setDiscountName(e.target.value)
    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setDescription(e.target.value)
    const handleChangePercent = (e: React.ChangeEvent<HTMLInputElement>) =>
        setPercent(e.target.value)
    const handleChangeStartDay = (date: Dayjs | null) => setStartDay(date)
    const handleChangeEndDay = (date: Dayjs | null) => setEndDay(date)

    const setAll = (
        id: string,
        name: string,
        description: string,
        percent: string,
        startDay: Dayjs | null,
        endDay: Dayjs | null,
    ) => {
        setId(id)
        setDiscountName(name)
        setDescription(description)
        setPercent(percent)
        setStartDay(startDay)
        setEndDay(endDay)
    }

    const validate = () => {
        if (!id || !discountName || !description || !percent || !startDay || !endDay) {
            return false
        }

        return true
    }

    return {
        id,
        handleChangeId,
        discountName,
        handleChangeDiscountName,
        description,
        handleChangeDescription,
        percent,
        handleChangePercent,
        startDay,
        handleChangeStartDay,
        endDay,
        handleChangeEndDay,
        setAll,
        validate,
    }
}
