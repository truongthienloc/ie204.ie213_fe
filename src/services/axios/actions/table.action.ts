import { OriginTableData, Table } from '~/interfaces/table.type'
import { api } from '..'
import tableEndpoint from '../endpoints/table.endpoint'

const tableAction = {
    getAllTable() {
        return new Promise<Table[]>(async (resolve, reject) => {
            try {
                const res = await api.get(tableEndpoint['get-all-table'])
                const data = res.data.data as Table[]
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    },
    postNewTable(tableData: OriginTableData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api.post(tableEndpoint['post-table'], tableData)
                resolve(res.data)
            } catch (error) {
                reject(error)
            }
        })
    },
}

export default tableAction
