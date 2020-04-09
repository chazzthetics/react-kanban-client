import React from "react";
import { Flex } from "@chakra-ui/core";
import BoardTitle from "./BoardTitle";
import StarBoardButton from "./StarBoardButton";

const BoardHeader = () => {
  return (
    <Flex
      className="BoardHeader"
      align="center"
      justify="space-between"
      bg="gray.300"
      px={1}
      py={2}
      mb={2}
      h="2.5rem"
    >
      <Flex justify="flex-start" align="center" mx={2}>
        <BoardTitle />
        <StarBoardButton />
      </Flex>
    </Flex>
  );
};

export default BoardHeader;
