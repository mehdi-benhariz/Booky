import { useState, useEffect } from "react";
import BookCard from "@/layouts/BookCard";
import { Flex, Grid, GridItem, Input } from "@chakra-ui/react";
import { fetchBooks, searchBooks } from "../api/books";
import Navbar from "@/layouts/NavBar";

export async function getStaticProps() {
  const books = await fetchBooks();
  return {
    props: { books },
  };
}

const Books = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (event) => setSearchTerm(event.target.value);

  const [filteredBooks, setFilteredBooks] = useState(books);

  useEffect(() => {
    if (searchTerm !== "") {
      searchBooks(searchTerm).then((data) => setFilteredBooks(data));
    } else {
      setFilteredBooks(books);
    }
  }, [searchTerm, books]);

  const renderBookCards = () => {
    return filteredBooks.map((book) => (
      <GridItem key={book.id}>
        <BookCard {...book} />
      </GridItem>
    ));
  };
  return (
    <>
      <Navbar />
      <Flex direction="column" align="center" maxW="6xl" mx="auto" my="20">
        <Input
          placeholder="Search Books"
          value={searchTerm}
          onChange={handleSearchTermChange}
          maxW="md"
          mb="6"
        />
        <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6}>
          {renderBookCards()}
        </Grid>
      </Flex>
    </>
  );
};

export default Books;
