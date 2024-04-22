export type TableStatus = 'Available' | 'Occupied' | 'Chose'

export type Table = {
    id: string
    tableFloor: string
    tablePosition: string
    tableStatus: TableStatus
}

export type Tables = Table[]
