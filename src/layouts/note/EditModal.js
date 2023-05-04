import {
  Button,
  Editable,
  EditablePreview,
  EditableTextarea,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Link from "next/link";
import { useStore } from "@/store";
import { updateNote } from "@/pages/api/notes";

const EditNoteModal = () => {
  const isEditNoteModalOpen = useStore((state) => state.isEditNoteModalOpen);
  const toggleEditNoteModal = useStore((state) => state.toggleEditNoteModal);
  const currentNote = useStore((state) => state.currentNote);
  const setcurrentNote = useStore((state) => state.setCurrentNote);

  const handleNoteEdit = async (e) => {
    e.preventDefault();
    console.log(currentNote);
    const res = await updateNote(currentNote.id, {
      ...currentNote,
      recentUpdate: new Date().toISOString(),
    });
    console.log({ res });
    if (res.status === 200) toggleEditNoteModal();
  };
  return (
    <Modal
      isOpen={isEditNoteModalOpen}
      onClose={toggleEditNoteModal}
      size="full"
    >
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
  );
};

export default EditNoteModal;
