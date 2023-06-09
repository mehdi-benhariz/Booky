import React, { useState, useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";

import Options from "@/layouts/Options";
import { searchBooks } from "../api/books";
import RecentBookCard from "@/layouts/book/RecentBookCard";
import { useStore } from "@/store";
export default function HomePage() {
  const [recentBooks, setrecentBooks] = useState([]);
  const hasUpdated = useStore((state) => state.hasUpdated);
  const isBookDeleted = useStore((state) => state.isBookDeleted);

  async function getRecentBooks() {
    const res = await searchBooks({
      limit: 3,
      sort: "recentUpdate&_order=desc",
    });
    if (res) setrecentBooks(res.data);
    console.log(res);
  }

  useEffect(() => getRecentBooks, [hasUpdated, isBookDeleted]);

  return (
    <Box p={10}>
      <Box w="50%" mt="40px">
        <Options />
      </Box>

      <Box w="100%" my={10} mx="auto">
        <Heading size="md" mb={2}>
          Finish reading
        </Heading>
        {recentBooks.map((book) => (
          <RecentBookCard key={book.id} {...book} />
        ))}
      </Box>
    </Box>
  );
}
