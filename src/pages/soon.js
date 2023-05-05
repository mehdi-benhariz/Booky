import { Center, Heading } from "@chakra-ui/react";

const Soon = () => {
  return (
    <Center height="100vh">
      <Heading
        as="h1"
        size="4xl"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontWeight="extrabold"
        textAlign="center"
      >
        Coming Soon
      </Heading>
      <Heading as="h2" size="4xl">
        😉
      </Heading>
    </Center>
  );
};

export default Soon;
