import { Tables } from '~/interfaces/table.type'

export const groupDataByTableFloor = (data: Tables) => {
    if (!data || data.length === 0) {
        return []
    }
    // Tạo một đối tượng để lưu trữ dữ liệu nhóm
    const groupedData: { [key: string]: Tables } = {}

    // Lặp qua mỗi mục trong mảng dữ liệu
    data.forEach((item) => {
        // Kiểm tra xem đã có nhóm cho tầng này chưa
        if (!groupedData[item.tableFloor]) {
            groupedData[item.tableFloor] = [item]
        } else {
            groupedData[item.tableFloor].push(item)
        }
    })

    // Chuyển đổi đối tượng nhóm thành mảng
    const resultArray = Object.values(groupedData)

    return resultArray.length > 0 ? resultArray : []
}
