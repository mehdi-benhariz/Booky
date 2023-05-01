import { Badge } from "@chakra-ui/react";

const BookStatus = (totalPages, currentPage) => {
  //round to the nearest integer
  if (currentPage === 0)
    return (
      <Badge size="lg" colorScheme="purple">
        New
      </Badge>
    );
  if (currentPage === totalPages)
    return (
      <Badge size="lg" colorScheme="green">
        Complete
      </Badge>
    );
  const percentage = Math.round((currentPage / totalPages) * 100);

  return (
    <Badge size="lg" colorScheme="yellow">
      {percentage}%
    </Badge>
  );
};

export default BookStatus;
