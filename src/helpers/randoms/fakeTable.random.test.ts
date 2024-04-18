import { generateTablesData } from './fakeTable.random'
import { Tables, Table } from '~/interfaces/table.type'

describe('generateTablesData', () => {
    it('should generate the specified number of tables', () => {
        const numTables = 5
        const tablesData = generateTablesData(numTables)
        expect(tablesData.length).toBe(numTables)
    })

    it('should generate tables with valid properties', () => {
        const numTables = 3
        const tablesData = generateTablesData(numTables)
        tablesData.forEach((table: Table, index: number) => {
            expect(table.id).toBeDefined()
            expect(table.tableFloor).toMatch(/Floor [1-3]/)
            expect(table.tablePosition).toMatch(/Position [1-3]/)
            expect(table.tableStatus).toMatch(/Available|Occupied|Chose/)
        })
    })
})
