import Navbar from "@/layouts/NavBar";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <title>Booky 📖</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
