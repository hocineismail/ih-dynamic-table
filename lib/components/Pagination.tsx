interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNavigateToPage: (page: number) => void;
}

/**
 * PaginationComponent is a React functional component that renders a pagination control.
 * It allows navigation through pages and displays a set of page numbers based on the current page and total pages.
 *
 * @param {PaginationProps} props - The properties for the PaginationComponent.
 * @param {number} props.currentPage - The current active page.
 * @param {number} props.totalPages - The total number of pages available.
 * @param {function} props.onNavigateToPage - The function to call when navigating to a different page.
 *
 * @returns {JSX.Element} The rendered pagination component.
 *
 *
 *
 */
const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNavigateToPage,
}): any => {
  let paginationArray: number[] = [];

  if (totalPages <= 5) {
    paginationArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (currentPage <= 3) {
      paginationArray = [1, 2, 3, 4, 5];
    } else if (currentPage >= totalPages - 2) {
      paginationArray = Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
    } else {
      paginationArray = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];
    }
  }

  return (
    <div className="ih-pagination-container">
      <button
        className="ih-pagination-btn"
        onClick={() => onNavigateToPage(1)}
        disabled={currentPage === 1}
      >
        First
      </button>
      <button
        className="ih-pagination-btn"
        onClick={() => onNavigateToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {paginationArray.map((page: number) => (
        <button
          key={page}
          className={`pagination-item ${page === currentPage ? "active" : ""}`}
          onClick={() => onNavigateToPage(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}

      <button
        className="ih-pagination-btn"
        onClick={() => onNavigateToPage(currentPage + 1)}
        disabled={totalPages === currentPage}
      >
        Next
      </button>
      <button
        className="ih-pagination-btn"
        onClick={() => onNavigateToPage(totalPages)}
        disabled={totalPages === currentPage}
      >
        Last
      </button>
    </div>
  );
};

export default PaginationComponent;
