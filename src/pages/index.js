import { Box, Center, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { AddIcon, SearchIcon, Icon } from "@chakra-ui/icons";
import { CiStickyNote, BsThreeDots } from "react-icons/ci";
import Link from "next/link";
export default function HomePage() {
  return (
    <Box p={10}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Welcome to Booky , Mehdi
      </Text>

      <Box w="50%">
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
                <Icon as={BsThreeDots} boxSize={10} color={"gray.500"} />
              </Center>
            </Link>
          </GridItem>
        </Grid>
      </Box>
      <Box w="70%" my={10} mx="auto">
        <Heading size="md" mb={2}>
          Finish reading
        </Heading>
        <Box bg="white" p={4} borderRadius="md" boxShadow="md">
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Book Name 1
            </Text>
            <Box h="8px" bg="gray.100" borderRadius="full" mb={2}>
              <Box h="8px" bg="teal.500" borderRadius="full" w="20%"></Box>
            </Box>
            <Box>
              <Text as="span" mr={2}>
                Option 1
              </Text>
              <Text as="span" mr={2}>
                Option 2
              </Text>
              <Text as="span">Option 3</Text>
            </Box>
          </Box>
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Book Name 2
            </Text>
            <Box h="8px" bg="gray.100" borderRadius="full" mb={2}>
              <Box h="8px" bg="green.500" borderRadius="full" w="50%"></Box>
            </Box>
            <Box>
              <Text as="span" mr={2}>
                Option 1
              </Text>
              <Text as="span" mr={2}>
                Option 2
              </Text>
              <Text as="span">Option 3</Text>
            </Box>
          </Box>
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Book Name 3
            </Text>
            <Box h="8px" bg="gray.100" borderRadius="full" mb={2}>
              <Box h="8px" bg="red.500" borderRadius="full" w="80%"></Box>
            </Box>
            <Box>
              <Text as="span" mr={2}>
                Option 1
              </Text>
              <Text as="span" mr={2}>
                Option 2
              </Text>
              <Text as="span">Option 3</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
