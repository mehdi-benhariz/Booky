import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Progress,
  Text,
} from "@chakra-ui/react";
import {
  AddIcon,
  SearchIcon,
  Icon,
  EditIcon,
  DeleteIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { CiStickyNote, BsThreeDots } from "react-icons/ci";
import Link from "next/link";
import Navbar from "@/layouts/NavBar";
export default function HomePage() {
  return (
    <Box p={10}>
      <Navbar />
      <Box w="50%" mt="40px">
        <Grid templateColumns="repeat(4, 1fr)" mx="auto">
          <GridItem>
            <Link href="/add">
              <Center h="140px" w="140px" bg="white" boxShadow="lg">
                <AddIcon boxSize={10} color={"green.500"} />
              </Center>
            </Link>
          </GridItem>
          <GridItem>
            <Link href="/books">
              <Center h="140px" w="140px" bg="white" boxShadow="lg">
                <SearchIcon boxSize={10} color={"purple.500"} />
              </Center>
            </Link>
          </GridItem>
          <GridItem>
            <Link href="/notes">
              <Center h="140px" w="140px" bg="white" boxShadow="lg">
                <Icon as={CiStickyNote} boxSize={10} color={"yellow.500"} />
              </Center>
            </Link>
          </GridItem>
          <GridItem>
            <Link href="/add">
              <Center h="140px" w="140px" bg="white" boxShadow="lg">
                <SettingsIcon boxSize={10} color={"gray.500"} />
              </Center>
            </Link>
          </GridItem>
        </Grid>
      </Box>
      {/* ! Idea : recent red books can be an array of 3 elements , each time you do edit or access
      it pushes to array and check the size, if it passes 10 (example) it pop the last visited elements */}
      <Box w="100%" my={10} mx="auto">
        <Heading size="md" mb={2}>
          Finish reading
        </Heading>
        <Box bg="white" p={4} borderRadius="md" boxShadow="md">
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Flex>
              <Box mr={4}>
                <Image src="https://via.placeholder.com/100" alt="Book Cover" />
              </Box>
              <Box flex="2">
                <Text fontSize="lg" fontWeight="bold">
                  Atomic Habits
                </Text>
                <Text fontSize="sm" color="gray.500">
                  James Clear
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
      </Box>
    </Box>
  );
}
