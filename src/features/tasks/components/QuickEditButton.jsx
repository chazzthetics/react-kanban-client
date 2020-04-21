import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { IconButton } from "@chakra-ui/core";

const QuickEditButton = () => {
  return (
    <IconButton
      position="absolute"
      top={1}
      right={1}
      icon={FiEdit2}
      size="xs"
      height="25px"
      aria-label="Edit task"
      bg="transparent"
      _hover={{
        backgroundColor: "rgba(9,30,66,.08)",
        color: "gray.700"
      }}
      _focus={{
        boxShadow: "none",
        backgroundColor: "hsla(0,0%,100%,0.2)",
        color: "gray.800"
      }}
      _active={{
        backgroundColor: "rgba(9,30,66,.13)",
        color: "gray.800"
      }}
      transition="background-color 100ms ease-in"
      onClick={e => {
        e.stopPropagation();
      }}
    />
  );
};

export default QuickEditButton;
