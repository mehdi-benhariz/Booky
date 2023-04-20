import {
  Card,
  Stack,
  Image,
  CardBody,
  Text,
  Heading,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import BookStatus from "./BookStatus";
const BookCard = (book) => {
  const { id, title, author, totalPages, currentPage, hasNot, image } = book;
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={image}
        alt={`Cover of ${title}`}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{title} </Heading>
          <Text fontSize="sm" color="gray.500">
            {author}
          </Text>
          {BookStatus(totalPages, currentPage)}
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="blue">
            <Link href={`books/${id}`}>Details</Link>
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default BookCard;
