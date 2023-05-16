// pages/add-book.js

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { handleFieldControl } from "@/utils/validation";
import { InsertBook } from "../../api/books";
import { v4 as uuidv4 } from "uuid";

export default function AddBook() {
  const [books, setBooks] = useState([
    {
      title: "",
      author: "",
      totalPages: 0,
      image: "",
      currentPage: 0,
      hasNote: false,
    },
  ]);

  //
  const [errors, setErrors] = useState([]);

  const addBook = () => {
    setBooks([
      ...books,
      {
        title: "",
        author: "",
        totalPages: 0,
        image: "",
        currentPage: 0,
        hasNote: false,
      },
    ]);
  };

  const removeBook = (index) => {
    const newBooks = [...books];
    newBooks.splice(index, 1);
    setBooks(newBooks);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newBooks = [...books];
    if (!handleFieldControl(name, value)) return;
    newBooks[index][name] = name === "totalPages" ? parseInt(value) : value;
    setBooks(newBooks);
  };
  // add error handling for each book
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(books);
    books.forEach(async (book, index) => {
      const newBook = {
        id: uuidv4(),
        ...book,
      };
      const res = await InsertBook(newBook);
      if (res.status === 201) {
        console.log("Book added successfully");
        removeBook(index);
      } else {
        //TODO add error handling
        console.log("Error adding book");
        setErrors([...errors, res.data]);
      }
    });
    //TODO Seperate error handling in a different function
    if (errors.length > 0) {
      console.log("Errors: ", errors);
    }
    //redirect to books page
    else router.push("/books");
  };

  return (
    <Box p={4} mt={10}>
      <form onSubmit={handleSubmit}>
        {books.map((book, index) => (
          <Box
            key={index}
            p={4}
            my={4}
            boxShadow="md"
            borderRadius="md"
            position="relative"
          >
            {index !== 0 && (
              <Box
                as="button"
                position="absolute"
                top={1}
                right={1}
                size="sm"
                variant="ghost"
                transition="all 0.4s ease-in-out"
                padding={1}
                borderRadius="md"
                _hover={{
                  bg: "red.500",
                  color: "white",
                }}
                onClick={() => removeBook(index)}
              >
                <CloseIcon />
              </Box>
            )}
            <Stack spacing={4}>
              <Flex>
                <FormControl isRequired mr={4}>
                  <FormLabel>Title</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" />
                    <Input
                      name="title"
                      placeholder="Enter the book title"
                      value={book.title}
                      onChange={(event) => handleInputChange(event, index)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired mr={4}>
                  <FormLabel>Author</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" />
                    <Input
                      name="author"
                      placeholder="Enter the author name"
                      value={book.author}
                      onChange={(event) => handleInputChange(event, index)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Total Pages</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" />
                    <Input
                      type="number"
                      name="totalPages"
                      placeholder="Enter the total number of pages"
                      value={book.totalPages}
                      onChange={(event) => handleInputChange(event, index)}
                    />
                  </InputGroup>
                </FormControl>
              </Flex>
              <FormControl isRequired>
                <FormLabel>Image Link</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input
                    name="image"
                    placeholder="Enter the image link"
                    value={book.image}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                </InputGroup>
              </FormControl>
            </Stack>
          </Box>
        ))}
        <Button mt={4} onClick={addBook}>
          Add Another Book
        </Button>
        <Button mt={4} ml={4} colorScheme="blue" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </Box>
  );
}
