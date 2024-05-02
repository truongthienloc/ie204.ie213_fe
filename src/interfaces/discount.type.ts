export type DiscountData = {
    discountName: string
    discountCode: string
    discountPercent: number
    discountDescription: string
    startDay: string
    endDay: string
}

export type Discount = {
    _id: string
    discountName: string
    discountCode: string
    discountPercent: number
    discountDescription: string
    startDay: string
    endDay: string
    users: any[] // Assuming this is an array of users, you can replace 'any' with the actual user type
    createdAt: string
    updatedAt: string
}
