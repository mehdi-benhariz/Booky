import { useState } from "react";
import {
  Box,
  Image,
  Textarea,
  Button,
  Progress,
  Flex,
  Editable,
  EditableInput,
  EditablePreview,
  Text,
} from "@chakra-ui/react";

const BookDetails = () => {
  const [book, setBook] = useState({
    title: "The Alchemist",
    author: "Paulo Coelho",
    totalPages: 197,
    currentPage: 0,
    image: "https://images-na.ssl-images-amazon.com/images/I/81nzxODnaJL.jpg",
    hasNote: true,
    note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
  });

  return (
    <div>
      <h1>Book Details</h1>
      return (
      <Flex h="100vh" justify="center" align="center" bg="gray.200">
        <Box
          w="80%"
          bg="white"
          boxShadow="lg"
          borderRadius="md"
          p={8}
          overflow="hidden"
        >
          <Flex mb={8} align="center">
            <Image
              src={book.image}
              alt={book.title}
              w="200px"
              h="300px"
              objectFit="cover"
              mr={8}
            />
            <Box>
              <Editable defaultValue={book.title} fontSize="3xl" mb={4}>
                <EditablePreview />
                <EditableInput />
              </Editable>
              <Editable defaultValue={book.author} fontSize="xl" mb={4}>
                <EditablePreview />
                <EditableInput />
              </Editable>
              <Text mb={4}>
                Progress: {book.currentPage}/{book.totalPages} pages
              </Text>
              <Progress
                size="sm"
                value={(book.currentPage / book.totalPages) * 100}
                colorScheme="purple"
                mb={4}
              />
            </Box>
          </Flex>
          {book.hasNote ? (
            <Box mb={8}>
              <Text fontSize="2xl" mb={4}>
                Note:
              </Text>
              <Textarea defaultValue={book.note} size="lg" />
            </Box>
          ) : (
            <Button size="lg" mb={8}>
              Add a Note
            </Button>
          )}
          <Flex justify="space-between">
            <Button colorScheme="red" size="lg">
              Delete
            </Button>
            <Button colorScheme="blue" size="lg">
              Update
            </Button>
          </Flex>
        </Box>
      </Flex>
      );
    </div>
  );
};

export default BookDetails;
