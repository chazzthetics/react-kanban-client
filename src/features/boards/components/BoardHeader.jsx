import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentBoardId } from "../boardsSlice";
import { Box, Flex, useDisclosure } from "@chakra-ui/core";
import BoardTitle from "./BoardTitle";
import StarBoardButton from "./StarBoardButton";
import ClearBoardButton from "./ClearBoardButton";
import RemoveBoardButton from "./RemoveBoardButton";
import SideBar from "../../../components/SideBar/SideBar";
import { sidebarTransition } from "../../../utils/transitions";

const BoardHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentBoardId = useSelector(selectCurrentBoardId);

  return (
    <Flex
      className="BoardHeader"
      align="center"
      justify="space-between"
      py={2}
      px={4}
    >
      {/* Left Side */}
      <Flex justify="flex-start" align="center">
        {currentBoardId && (
          <>
            <BoardTitle />
            <StarBoardButton />
          </>
        )}
      </Flex>

      {/* Right Side */}
      <Flex justify="flex-start" align="center">
        <Box
          spacing={4}
          transform={isOpen ? "translateX(-218px)" : "translateX(0)"}
          transition={sidebarTransition}
        >
          <ClearBoardButton />
          <RemoveBoardButton />
        </Box>

        {/* SideBar */}
        <SideBar
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          sidebarTransition={sidebarTransition}
        />
      </Flex>
    </Flex>
  );
};

export default BoardHeader;
