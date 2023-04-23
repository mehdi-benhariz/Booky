export const countProgress = (currentPage, totalPages) =>
  Math.round((currentPage / totalPages) * 100);
