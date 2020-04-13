import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentBoardId } from "../boardsSlice";
import { Flex } from "@chakra-ui/core";
import BoardTitle from "./BoardTitle";
import StarBoardButton from "./StarBoardButton";
import SideBar from "../../../components/SideBar";
import ActivityFeed from "../../activities/components/ActivityFeed";

const BoardHeader = () => {
  const currentBoardId = useSelector(selectCurrentBoardId);

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
        {currentBoardId && <StarBoardButton />}
      </Flex>
      <SideBar>
        <ActivityFeed />
      </SideBar>
    </Flex>
  );
};

export default BoardHeader;
