export default function addLazyLoadingToImages(html: string): string {
    // Sử dụng regex để tìm tất cả các thẻ <img
    // Thêm thuộc tính loading="lazy" nếu chưa có
    return html.replace(/<img(?![^>]*loading="lazy")/g, '<img loading="lazy"')
}
