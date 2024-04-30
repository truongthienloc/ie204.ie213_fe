export type TableStatus = 'Available' | 'Occupied' | 'Chose'

type TableUser = {
    userId: string
    bookingTime: string
}

export type OriginTableData = {
    tableFloor: string
    tablePosition: string
    tableStatus: TableStatus
}

export type Table = OriginTableData & {
    _id: string
    user?: TableUser
    createdAt?: string
    updatedAt?: string
}

export type Tables = Table[]
