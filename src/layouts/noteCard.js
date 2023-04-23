import { Box, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const NoteCard = ({ note, onEdit }) => {
  const truncatedContent = note.content.split(" ").slice(0, 50).join(" ");

  return (
    <Box
      width={200}
      height={200}
      boxShadow="md"
      p={4}
      borderRadius="md"
      onClick={onEdit}
      cursor="pointer"
      position="relative"
      aspectRatio="1"
      transition="all 0.2s ease-in-out"
      _hover={{ transform: "translateY(-4px)" }}
      _active={{ transform: "translateY(0px)" }}
      _focus={{ outline: "none", boxShadow: "outline" }}
    >
      <Tooltip label="Edit Note" aria-label="Edit Note">
        <IconButton
          icon={<EditIcon />}
          aria-label="Edit Note"
          position="absolute"
          top={2}
          right={2}
          variant="ghost"
          onClick={(event) => {
            event.stopPropagation();
            onEdit();
          }}
        />
      </Tooltip>
      <Text fontWeight="bold" mb={2}>
        {note.book}
      </Text>
      <Text mb={2}>
        {truncatedContent}
        {note.content.length > 50 ? "..." : ""}
      </Text>
      <Text fontSize="sm" color="gray.500">
        Updated {new Date(note.recentCheck).toLocaleDateString()}
      </Text>
    </Box>
  );
};

export default NoteCard;
