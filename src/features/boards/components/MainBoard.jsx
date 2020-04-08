import React from "react";
import { Flex, IconButton } from "@chakra-ui/core";
import { FiStar } from "react-icons/fi";
import BoardTitle from "./BoardTitle";

const MainBoard = () => {
  return (
    <div className="MainBoard">
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
          <IconButton
            aria-label="Star Board"
            icon={FiStar}
            size="sm"
            fontSize="1rem"
          />
        </Flex>
      </Flex>
    </div>
  );
};

export default MainBoard;
