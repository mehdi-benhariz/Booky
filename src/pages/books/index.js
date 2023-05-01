import { useState, useEffect } from "react";
import BookCard from "@/layouts/book/BookCard";
import { Button, Flex, Grid, GridItem, Input, Icon } from "@chakra-ui/react";
import { GrFilter } from "react-icons/gr";
import { fetchBooks, searchBooks } from "../api/books";
import Navbar from "@/layouts/NavBar";
import FilterModal from "@/layouts/FilterModal";
import Pagination from "@/layouts/Pagination";

export async function getStaticProps() {
  const res = await searchBooks({});
  return {
    props: { books: res.data },
  };
}

const Books = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const handleSearchTermChange = (event) => setSearchTerm(event.target.value);

  const [filteredBooks, setFilteredBooks] = useState(books);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (filters) => setSelectedFilters(filters);

  const handleApplyFilters = () => {
    // Do something with selectedFilters
    setIsOpen(false);
  };

  useEffect(() => {
    // if (searchTerm !== "")
    searchBooks({ searchTerm, page }).then((res) => {
      setFilteredBooks(res.data);
      setTotalCount(res.headers["x-total-count"]);
    });
    // else setFilteredBooks(books);
  }, [searchTerm, books, page]);

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
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "stretch", md: "center" }}
          maxW="6xl"
          mx="auto"
          my="20"
        >
          <Input
            placeholder="Search Books"
            value={searchTerm}
            onChange={handleSearchTermChange}
            maxW="md"
            mb="6"
          />
          <Button
            leftIcon={<Icon as={GrFilter} />}
            onClick={() => setIsOpen(true)}
            mb="6"
          >
            Filter
          </Button>
        </Flex>

        <FilterModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
          handleApplyFilters={handleApplyFilters}
        />
        <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6}>
          {renderBookCards()}
        </Grid>
        <Pagination
          page={page}
          pageSize={10}
          action={setPage}
          totalCount={totalCount}
        />
      </Flex>
    </>
  );
};

export default Books;
