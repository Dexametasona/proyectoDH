import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CustomPagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}) => {
  const maxPageNum = 5; // Máximo número de páginas a mostrar
  const pageNumLimit = Math.floor(maxPageNum / 2); // Páginas alrededor de la actual

  // Cálculo de las páginas visibles
  const activePages = Array.from(
    { length: Math.min(maxPageNum, totalPages) },
    (_, i) => {
      const offset = Math.max(
        0,
        Math.min(
          currentPage - 1 - pageNumLimit,
          totalPages - maxPageNum
        )
      );
      return i + 1 + offset;
    }
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const renderPages = () => {
    const pages = activePages.map((page) => (
      <PaginationItem key={page} active={currentPage === page}>
        <button
          onClick={() => setCurrentPage(page)}
          className={`px-4 py-2 rounded ${
            currentPage === page
              ? "bg-primary text-white"
              : "hover:bg-neutral-200"
          }`}
        >
          {page}
        </button>
      </PaginationItem>
    ));

    // Elipsis al inicio
    if (activePages[0] > 1) {
      pages.unshift(
        <PaginationItem key="ellipsis-start">
          <button onClick={() => setCurrentPage(activePages[0] - 1)}>
            ...
          </button>
        </PaginationItem>
      );
    }

    // Elipsis al final
    if (activePages[activePages.length - 1] < totalPages) {
      pages.push(
        <PaginationItem key="ellipsis-end">
          <button
            onClick={() =>
              setCurrentPage(activePages[activePages.length - 1] + 1)
            }
          >
            ...
          </button>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          {/* Botón de página anterior */}
          <PaginationItem>
            <PaginationPrevious
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={handlePrevPage}
            />
          </PaginationItem>

          {/* Páginas dinámicas */}
          {renderPages()}

          {/* Botón de página siguiente */}
          <PaginationItem>
            <PaginationNext
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={handleNextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default CustomPagination;
