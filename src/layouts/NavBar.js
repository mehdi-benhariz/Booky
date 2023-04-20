import { useState, useEffect } from "react";
import { Flex, Link, Text } from "@chakra-ui/react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = currentScrollPos < 100;
      setIsVisible(visible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      right="0"
      bg="white"
      boxShadow="md"
      p="4"
      justify="space-between"
      align="center"
      zIndex="100"
      transition="all 0.3s ease-in-out"
      opacity={isVisible ? "1" : "0"}
      transform={isVisible ? "none" : "translateY(-100%)"}
    >
      <Link href="/" _hover={{ textDecoration: "none" }}>
        <Text as="i" fontSize="xl">
          Welcome {""}
        </Text>
        <Text
          as="b"
          fontSize="xl"
          borderBottomWidth="5px"
          borderBottomColor="purple.500"
        >
          Mehdi
        </Text>
      </Link>
    </Flex>
  );
};

export default Navbar;
