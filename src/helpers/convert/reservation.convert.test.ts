import { groupDataByTableFloor } from './reservation.convert'
import { Tables, Table } from '~/interfaces/table.type'

describe('groupDataByTableFloor', () => {
    it('should return an empty array if input data is empty', () => {
        const emptyData: Tables = []
        const result = groupDataByTableFloor(emptyData)
        expect(result).toEqual([])
    })

    it('should group data by table floor', () => {
        const inputData: Tables = [
            {
                id: '1',
                tableFloor: 'Floor 1',
                tablePosition: 'Position 1',
                tableStatus: 'Available',
            },
            {
                id: '2',
                tableFloor: 'Floor 2',
                tablePosition: 'Position 2',
                tableStatus: 'Occupied',
            },
            { id: '3', tableFloor: 'Floor 1', tablePosition: 'Position 3', tableStatus: 'Chose' },
            {
                id: '4',
                tableFloor: 'Floor 2',
                tablePosition: 'Position 4',
                tableStatus: 'Available',
            },
        ]

        const expectedResult: Tables[] = [
            [
                {
                    id: '1',
                    tableFloor: 'Floor 1',
                    tablePosition: 'Position 1',
                    tableStatus: 'Available',
                },
                {
                    id: '3',
                    tableFloor: 'Floor 1',
                    tablePosition: 'Position 3',
                    tableStatus: 'Chose',
                },
            ],
            [
                {
                    id: '2',
                    tableFloor: 'Floor 2',
                    tablePosition: 'Position 2',
                    tableStatus: 'Occupied',
                },
                {
                    id: '4',
                    tableFloor: 'Floor 2',
                    tablePosition: 'Position 4',
                    tableStatus: 'Available',
                },
            ],
        ]

        const result = groupDataByTableFloor(inputData)
        expect(result).toEqual(expectedResult)
    })
})
