import { deleteBook } from "@/pages/api/books";
import { useStore } from "@/store";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useToast,
} from "@chakra-ui/react";

const DeleteBookModal = () => {
  const isDeleteModalOpen = useStore((state) => state.isDeleteModalOpen);
  const closeModal = useStore((state) => state.closeModal);
  const bookIdToDelete = useStore((state) => state.bookIdToDelete);
  const toggleIsBookDeleted = useStore((state) => state.toggleIsBookDeleted);
  const toast = useToast();

  const handleDelete = async () => {
    const res = await deleteBook(bookIdToDelete);
    if (res) {
      console.log(res);
      toast({
        title: `Book with ID ${bookIdToDelete} deleted.`,
        description: "Book deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      toggleIsBookDeleted();
      closeModal();
    }
  };

  return (
    <Modal isOpen={isDeleteModalOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this item?</ModalBody>
        <ModalFooter>
          <Button onClick={closeModal}>Cancel</Button>
          <Button colorScheme="red" onClick={handleDelete} ml={3}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBookModal;
