import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '~/components/ui/pagination'
function PaginationSection({
    totalItems,
    itemsPerPage,
    currentPage,
    setCurrentPage,
}: {
    totalItems: any
    itemsPerPage: any
    currentPage: any
    setCurrentPage: any
}) {
    let pages = []
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pages.push(i)
    }
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1)
        }
    }
    return (
        <>
            <Pagination className="my-8 cursor-pointer">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => handlePrevPage()} />
                    </PaginationItem>

                    {pages.map((page, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink onClick={() => setCurrentPage(page)}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext onClick={() => handleNextPage()}></PaginationNext>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}
export default PaginationSection
