import { useState } from "react";
import {
  Box,
  VStack,
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
} from "@chakra-ui/react";
import { fetchNotes } from "../api/notes";
import NoteCard from "@/layouts/noteCard";

export async function getStaticProps() {
  const notes = await fetchNotes();
  return {
    props: { notes },
  };
}

const Notes = ({ notes }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNoteEdit = (index) => {
    // handle note edit logic
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
            <NoteCard note={note} onEdit={() => handleNoteEdit(index)} />
          </GridItem>
        ))}
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="note-content">
              <FormLabel>Note Content</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="note-book">
              <FormLabel>Note Book</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="note-recent-check">
              <FormLabel>Note Recent Check</FormLabel>
              <Input type="date" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Notes;
