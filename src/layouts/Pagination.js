import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Button, Center, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Pagination({ page, pageSize, totalCount, action }) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  console.log({ start, end, page, pageSize, totalCount, totalPages });

  const incrementPage = (x) => page < totalPages && action(x);
  const decrementPage = (x) => page > 1 && action(x);

  const handlePageChange = (newPage) => router.push(`/books?page=${newPage}`);

  return (
    <Center mt={8}>
      <HStack spacing={4}>
        <Button
          disabled={page === 1}
          onClick={() => {
            decrementPage(page - 1);
            handlePageChange(page - 1);
          }}
          leftIcon={<ArrowLeftIcon />}
        >
          Prev
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Button
            key={p}
            colorScheme={p === page ? "blue" : "gray"}
            onClick={() => {
              action(p);
              handlePageChange(p);
            }}
          >
            {p}
          </Button>
        ))}
        <Button
          disabled={page === totalPages}
          onClick={() => {
            incrementPage(page + 1);
            handlePageChange(page + 1);
          }}
          rightIcon={<ArrowRightIcon />}
        >
          Next
        </Button>
      </HStack>
    </Center>
  );
}
