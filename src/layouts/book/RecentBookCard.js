import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Progress, Text } from "@chakra-ui/react";
import Image from "next/image";

const RecentBookCard = (props) => {
  const book = props;

  return (
    <Box bg="white" p={4} borderRadius="md" boxShadow="md">
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
        <Flex>
          <Box mr={4}>
            <Image src={book.image} alt="Book Cover" width={40} height={40} />
          </Box>
          <Box flex="2">
            <Text fontSize="lg" fontWeight="bold">
              {book.title}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {book.author}
            </Text>
            <Progress
              mt={2}
              value={50}
              colorScheme="green"
              size="lg"
              hasStripe
              isAnimated
            >
              <Text fontSize="s" textAlign="center">
                {Math.floor(50)}%
              </Text>
            </Progress>{" "}
          </Box>
          <Flex
            flex="1"
            alignItems="center"
            justifyContent="space-between"
            ml={8}
            pl={8}
          >
            <IconButton
              size="lg"
              icon={<AddIcon />}
              aria-label="Add to Reading List"
              mr={2}
            />
            <IconButton
              size="lg"
              icon={<EditIcon />}
              aria-label="Edit Reading Progress"
              mr={2}
            />
            <IconButton
              size="lg"
              icon={<DeleteIcon />}
              aria-label="Delete Book"
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default RecentBookCard;
