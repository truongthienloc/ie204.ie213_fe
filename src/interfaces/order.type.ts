type BillDish = {
    dishId: string
    dishAmount: number
    _id: string
}

export type Order = {
    _id: string
    totalMoney: number
    billPayed: boolean
    billDate: string
    user: {
        _id: string
        username: string
    }
    billDishes: BillDish[]
    createdAt: string
    updatedAt: string
}
