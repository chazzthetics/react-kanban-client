import React from "react";
import { Flex, Spinner as ChakraSpinner } from "@chakra-ui/core";

const Spinner = ({ ...rest }) => {
  return (
    <Flex justify="center" align="center" h="85vh" {...rest}>
      <ChakraSpinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="gray.500"
        size="xl"
      />
    </Flex>
  );
};

export default Spinner;
