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
import { getBookById, fetchBooks, deleteBook } from "../api/books";
import { useRouter } from "next/router";
import { handleFieldControl } from "@/utils/validation";
import { InsertNote, updateNote } from "../api/notes";

export async function getStaticPaths() {
  const bookIds = await fetchBooks();
  const paths = bookIds.map(({ id }) => ({ params: { id } }));
  // Return the paths
  return { paths, fallback: true };
}
export async function getStaticProps({ params }) {
  const book = await getBookById(params.id, params.hasNote);

  return { props: { book } };
}
const BookDetails = ({ book }) => {
  const [newBook, setNewBook] = useState({ ...book });
  const [newNote, setNewNote] = useState({ ...book.note });
  const router = useRouter();

  if (router.isFallback) {
    //give better laoding experience
    return <div>Loading...</div>;
  }
  const countProgress = (currentPage, totalPages) =>
    Math.round((currentPage / totalPages) * 100);
  //
  const handleBookInputChange = (event, index) => {
    const { name, value } = event.target;
    let bookObj = { ...newBook };
    if (!handleFieldControl(name, value)) return;
    bookObj[name] =
      name === ("totalPages" || "currentPage") ? parseInt(value) : value;
    setNewBook(bookObj);
  };

  //
  const handleNoteInputChange = (event) => {
    const { name, value } = event.target;
    let noteObj = { ...newNote };
    if (!handleFieldControl(name, value)) return;
    noteObj[name] = value;
    setNewNote(noteObj);
  };

  async function handleUpdateBook() {
    try {
      const res = await updateBook(newBook.id, newBook);
      console.log(res);
      //toast success
      if (res) return true;
    } catch (error) {
      //toast error
      return false;
    }
  }

  async function handleAddOrUpdateNote() {
    try {
      let res;

      if (newBook.hasNote) {
        res = await updateNote(newNote.id, newNote);
        //toast success
      } else {
        if (!newNote.content) return;
        res = await InsertNote({
          ...newNote,
          bookId: newBook.id,
        });
        setNewBook({ ...newBook, hasNote: true });
        //toast success
      }
      if (res) return true;
    } catch (error) {
      console.error(error);
    }
  }
  async function handleUpdateDetails(e) {
    e.preventDefault();
    await handleAddOrUpdateNote();
    await handleUpdateBook();
  }

  async function handleDeleteBook(e) {
    e.preventDefault();
    try {
      await deleteBook(newBook.id);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

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
              src={newBook.image}
              alt={newBook.title}
              w="200px"
              h="300px"
              objectFit="cover"
              mr={8}
            />
            <Box>
              <Editable defaultValue={newBook.title} fontSize="3xl" mb={4}>
                <EditablePreview />
                <EditableInput onChange={handleBookInputChange} />
              </Editable>
              <Editable defaultValue={newBook.author} fontSize="xl" mb={4}>
                <EditablePreview />
                <EditableInput onChange={handleBookInputChange} />
              </Editable>
              <Text mb={4}>
                Progress: You are in page{" "}
                <Editable
                  defaultValue={newBook.currentPage.toString()}
                  padding="1px"
                  display="inline-block"
                >
                  <EditablePreview color="grey.500" fontWeight="normal" />
                  <EditableInput
                    onChange={handleBookInputChange}
                    w="30px"
                    fontSize="sm"
                  />
                </Editable>{" "}
                Out of{" "}
                <Editable
                  defaultValue={newBook.totalPages.toString()}
                  padding="1px"
                  display="inline-block"
                >
                  <EditablePreview fontWeight="bold" />
                  <EditableInput
                    w="30px"
                    fontSize="sm"
                    onChange={handleBookInputChange}
                  />
                </Editable>{" "}
                pages
              </Text>
              <Progress
                size="sm"
                value={countProgress(newBook.currentPage, newBook.totalPages)}
                colorScheme="yellow"
                mb={4}
              />
            </Box>
          </Flex>
          <Flex justify="space-between">
            <Button colorScheme="red" size="lg" onClick={handleDeleteBook}>
              Delete
            </Button>
            <Button colorScheme="blue" size="lg" onClick={handleUpdateDetails}>
              Update
            </Button>
          </Flex>
          {newBook.hasNote ? (
            <Box mb={8}>
              <Text fontSize="2xl" mb={4}>
                Note:
              </Text>
              <Textarea
                defaultValue={newNote.content}
                onChange={handleNoteInputChange}
                size="lg"
              />
            </Box>
          ) : (
            <Button size="lg" mb={8}>
              Add a Note
            </Button>
          )}
        </Box>
      </Flex>
      );
    </div>
  );
};

export default BookDetails;
