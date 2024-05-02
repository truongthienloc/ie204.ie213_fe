export type TableStatus = 'Available' | 'Occupied' | 'Chose'

type TableUser = {
    _id: string
    bookingTime: string
    username: string
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
