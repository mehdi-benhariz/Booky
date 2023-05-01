import { useState } from "react";
import {
  Box,
  Heading,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  Text,
  Editable,
  EditablePreview,
  EditableTextarea,
} from "@chakra-ui/react";
import { fetchNotes, updateNote } from "../api/notes";
import NoteCard from "@/layouts/noteCard";
import Link from "next/link";

export async function getStaticProps() {
  const notes = await fetchNotes();
  return {
    props: { notes },
  };
}

const Notes = ({ notes }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentNote, setcurrentNote] = useState({});

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleModalRequest = (index) => {
    let theNote = notes[index];
    setcurrentNote(theNote);
    onOpen();
  };
  const handleNoteEdit = async (e) => {
    e.preventDefault();
    console.log(currentNote);
    const res = await updateNote(currentNote.id, {
      ...currentNote,
      recentUpdate: new Date().toISOString(),
    });
    console.log({ res });
    if (res.status === 200) onClose();
  };

  return (
    <Box p={4}>
      <Heading mb={4}>My Notes</Heading>
      <Box>
        <Input
          placeholder="Search notes..."
          mb={4}
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </Box>
      <Grid
        templateColumns={{
          base: "2fr",

          md: "repeat(4, 1fr)",
          lg: "repeat(6, 1fr)",
        }}
        gap={4}
      >
        {filteredNotes.map((note, index) => (
          <GridItem key={index} colSpan={{ base: 1, md: 1, lg: 1 }}>
            <NoteCard note={note} onEdit={() => handleModalRequest(index)} />
          </GridItem>
        ))}
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Note for Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Editable defaultValue={currentNote.content}>
              <EditablePreview />
              <EditableTextarea
                onChange={(e) =>
                  setcurrentNote({ ...currentNote, content: e.target.value })
                }
              />
            </Editable>

            <ModalFooter>
              <Button onClick={handleNoteEdit} colorScheme="blue" mr={2}>
                Update
              </Button>

              <Button>
                <Link href={`books/${currentNote.bookId}`}>Return to book</Link>
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Notes;
