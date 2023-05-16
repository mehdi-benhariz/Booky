import { useState } from "react";
import { Box, Heading, Input, Grid, GridItem } from "@chakra-ui/react";
import { fetchNotes, updateNote } from "@/api/notes";
import NoteCard from "@/layouts/note/noteCard";
import { useStore } from "@/store";
import EditNoteModal from "@/layouts/note/EditModal";

export async function getStaticProps() {
  const notes = await fetchNotes();
  return {
    props: { notes },
  };
}

const Notes = ({ notes }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleEditNoteModal = useStore((state) => state.toggleEditNoteModal);
  const setcurrentNote = useStore((state) => state.setCurrentNote);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleModalRequest = (index) => {
    let theNote = notes[index];
    setcurrentNote(theNote);
    toggleEditNoteModal();
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
      <EditNoteModal />
    </Box>
  );
};

export default Notes;
