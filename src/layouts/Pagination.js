import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Button, Center, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Pagination({ page, pageSize, totalCount, action }) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const incrementPage = () => page < totalPages && action(page + 1);
  const decrementPage = () => page > 1 && action(page - 1);

  const handlePageChange = (newPage) => router.push(`/books?page=${newPage}`);

  return (
    <Center mt={8}>
      <HStack spacing={4}>
        <Button
          disabled={page === 1}
          onClick={() => decrementPage() && handlePageChange(page)}
          leftIcon={<ArrowLeftIcon />}
        >
          Prev
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Button
            key={p}
            colorScheme={p === page ? "blue" : "gray"}
            onClick={() => handlePageChange(p)}
          >
            {p}
          </Button>
        ))}
        {page}
        <Button
          disabled={page === totalPages}
          onClick={() => incrementPage() && handlePageChange(page)}
          rightIcon={<ArrowRightIcon />}
        >
          Next
        </Button>
      </HStack>
    </Center>
  );
}
