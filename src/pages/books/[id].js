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
  useToast,
} from "@chakra-ui/react";
import { getBookById, fetchBooks, deleteBook, updateBook } from "../api/books";
import { useRouter } from "next/router";
import { handleFieldControl } from "@/utils/validation";
import { InsertNote, updateNote } from "../api/notes";
import { countProgress } from "@/utils/UI";

const BookDetails = ({ book }) => {
  const [newBook, setNewBook] = useState({ ...book });
  const [newNote, setNewNote] = useState({ ...book.notes[0] });
  const router = useRouter();
  const toast = useToast();

  console.log(book);
  if (router.isFallback) {
    //TODO give better laoding experience
    return <div>Loading...</div>;
  }

  //*update fields for book
  const handleBookInputChange = (event, index) => {
    const { name, value } = event.target;
    let bookObj = { ...newBook };
    if (!handleFieldControl(name, value)) return;
    bookObj[name] =
      name === "totalPages" || name === "currentPage" ? parseInt(value) : value;
    setNewBook(bookObj);
  };

  //*update fields for note
  const handleNoteInputChange = (event) => {
    const { name, value } = event.target;
    let noteObj = { ...newNote };
    if (!handleFieldControl(name, value)) return;
    noteObj[name] = value;
    setNewNote(noteObj);
  };

  async function handleUpdateBook() {
    console.log("updating book...");
    console.log({ newBook });
    try {
      delete newBook.notes;
      const res = await updateBook(newBook.id, newBook);
      console.log(res);
      //toast success
      toast({
        title: "Book updated.",
        description: "We've updated your book for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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

        toast({
          title: "Note updated.",
          description: "We've updated your note for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        if (!newNote.content) return;
        res = await InsertNote({
          ...newNote,
          bookId: newBook.id,
        });
        setNewBook({ ...newBook, hasNote: true });
        //toast success
        toast({
          title: "Note added.",
          description: "We've added your note for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      if (res) return true;
    } catch (error) {
      console.error(error);
    }
  }
  async function handleUpdateDetails(e) {
    e.preventDefault();
    if ((await handleAddOrUpdateNote()) && (await handleUpdateBook()))
      router.push("/books");
  }

  async function handleDeleteBook(e) {
    e.preventDefault();
    try {
      await deleteBook(newBook.id);
      toast({
        title: "Book deleted.",
        description: "We've deleted your book for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
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
                <EditableInput onChange={handleBookInputChange} name="title" />
              </Editable>
              <Editable defaultValue={newBook.author} fontSize="xl" mb={4}>
                <EditablePreview />
                <EditableInput onChange={handleBookInputChange} name="author" />
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
                    name="currentPage"
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
                    name="totalPages"
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
                name="content"
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
    </>
  );
};

export default BookDetails;

export async function getStaticPaths() {
  const bookIds = await fetchBooks();
  const paths = bookIds.map(({ id }) => ({ params: { id } }));
  // Return the paths
  return { paths, fallback: true };
}
export async function getStaticProps({ params }) {
  console.log(params);
  const book = await getBookById(params.id, true);

  return { props: { book } };
}
