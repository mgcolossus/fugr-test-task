import React from "react";
import classNames from "classnames";
import styles from "./Pagination.module.css";

function Pagination({ pagesCount, currentPage, onPageChange }) {
  const firstPageNumber = 1;
  const lastPageNumber = pagesCount;
  const paginationItems = [];

  if (lastPageNumber < 8) {
    for (let i = 0; i < lastPageNumber; i++) {
      paginationItems.push(i + 1);
    }
  } else {
    if (currentPage < 5) {
      paginationItems.push(firstPageNumber, 2, 3, 4, 5, null, lastPageNumber);
    } else if (currentPage >= lastPageNumber - 3) {
      paginationItems.push(
        firstPageNumber,
        null,
        lastPageNumber - 4,
        lastPageNumber - 3,
        lastPageNumber - 2,
        lastPageNumber - 1,
        lastPageNumber
      );
    } else {
      paginationItems.push(firstPageNumber, null, currentPage - 1, currentPage, currentPage + 1, null, lastPageNumber);
    }
  }
  return (
    <div className={styles.pagination}>
      {paginationItems.map((pageNumber, index) => {
        if (pageNumber === null) {
          return <span key={index}>...</span>;
        }
        return (
          <button
            className={classNames(styles.paginationItem, { [styles.paginationItemActive]: currentPage === pageNumber })}
            key={index}
            onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
