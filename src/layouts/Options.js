import { AddIcon, SearchIcon, SettingsIcon } from "@chakra-ui/icons";
import { Center, Grid, GridItem, Icon } from "@chakra-ui/react";
import { CiStickyNote } from "react-icons/ci";
import Link from "next/link";

const Options = () => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" mx="auto">
      <GridItem>
        <Link href="books/add">
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
        <Link href="/soon">
          <Center h="140px" w="140px" bg="white" boxShadow="lg">
            <SettingsIcon boxSize={10} color={"gray.500"} />
          </Center>
        </Link>
      </GridItem>
    </Grid>
  );
};

export default Options;
