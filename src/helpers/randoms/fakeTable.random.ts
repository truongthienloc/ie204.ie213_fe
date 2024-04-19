import type { Tables, Table, TableStatus } from '~/interfaces/table.type'

export function generateTablesData(numTables: number): Tables {
    const tables: Tables = []

    for (let i = 1; i <= numTables; i++) {
        const table: Table = {
            id: `table_${i}`,
            tableFloor: `Floor ${(i % 3) + 1}`,
            tablePosition: `Position ${i}`,
            tableStatus: i % 3 === 0 ? 'Chose' : i % 2 === 0 ? 'Occupied' : 'Available',
        }

        tables.push(table)
    }

    return tables
}
