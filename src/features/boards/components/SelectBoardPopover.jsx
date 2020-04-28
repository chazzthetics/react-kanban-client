import React from "react";
import { useSelector } from "react-redux";
import { boardsSelectors } from "../boardsSlice";
import { FiTrello, FiStar } from "react-icons/fi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure
} from "@chakra-ui/core";
import IconButton from "../../../components/IconButton";
import SelectContainer from "./SelectContainer";

const SelectBoardInput = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const boards = useSelector(state => boardsSelectors.selectAll(state));
  const starredBoards = boards.filter(board => board.is_starred);

  return (
    <Popover
      placement="bottom"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <IconButton
          icon={FiTrello}
          label="Boards"
          fontSize="0.9rem"
          fontWeight={700}
          text="Boards"
        />
      </PopoverTrigger>
      <PopoverContent
        zIndex={4}
        left={0}
        boxShadow="sm"
        bg="gray.50"
        w="17rem"
        _focus={{ boxShadow: "sm", outline: "none" }}
        borderRadius={4}
      >
        <PopoverBody>
          <SelectContainer
            icon={FiStar}
            heading="Starred Boards"
            onClose={onClose}
            boards={starredBoards}
          />
          <SelectContainer
            icon={FiTrello}
            heading="Personal Boards"
            onClose={onClose}
            boards={boards}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SelectBoardInput;
