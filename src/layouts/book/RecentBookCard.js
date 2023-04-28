import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Progress,
  ProgressLabel,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { countProgress } from "@/utils/UI";
import { deleteBook, updateBook } from "@/pages/api/books";
import { useRouter } from "next/router";

const RecentBookCard = (props) => {
  const book = props;
  const router = useRouter();
  async function setComplete() {
    const res = await updateBook(book.id, { currentPage: book.totalPages });
    if (res)
      //TODO update book list
      console.log(res);
  }
  async function handleDeleteRequest() {
    //TODO add custom verification modal
    const res = await deleteBook(book.id);
    if (res) {
      //TODO update book list
      console.log(res);
    }
  }
  const navigateDetails = () => router.push(`/books/${book.id}`);

  return (
    <Box bg="white" p={4} borderRadius="md" boxShadow="md">
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
        <Flex>
          <Box mr={4}>
            <Image src={book.image} alt="Book Cover" width={40} height={40} />
          </Box>
          <Box flex="2">
            <Text fontSize="lg" fontWeight="bold">
              {book.title}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {book.author}
            </Text>
            <Progress
              mt={2}
              value={countProgress(book.currentPage, book.totalPages)}
              colorScheme="green"
              size="lg"
              isAnimated
            >
              <ProgressLabel>
                <Text fontSize="sm" fontWeight="bold">
                  {countProgress(book.currentPage, book.totalPages)}%
                </Text>
              </ProgressLabel>
            </Progress>{" "}
          </Box>
          <Flex
            flex="1"
            alignItems="center"
            justifyContent="space-between"
            ml={8}
            pl={8}
          >
            <IconButton
              _hover={{ bg: "green.500", color: "white" }}
              size="lg"
              icon={<CheckIcon />}
              aria-label="Mark as Complete"
              mr={2}
              onClick={setComplete}
            />
            <IconButton
              _hover={{ bg: "yellow.500", color: "white" }}
              size="lg"
              icon={<EditIcon />}
              aria-label="Edit Reading Progress"
              mr={2}
              onClick={navigateDetails}
            />
            <IconButton
              _hover={{ bg: "red.500", color: "white" }}
              size="lg"
              icon={<DeleteIcon />}
              aria-label="Delete Book"
              onClick={handleDeleteRequest}
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default RecentBookCard;
