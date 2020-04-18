import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { selectCurrentBoardId } from "../../boards/boardsSlice";
import { removeColumn, clearColumn } from "../columnsSlice";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  PopoverFooter,
  Divider,
  useDisclosure
} from "@chakra-ui/core";
import IconButton from "../../../components/IconButton";
import ColumnActionsButton from "./ColumnActionButton";

const ColumnActionsPopover = ({ columnId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const container = useClickOutside(onClose);

  const dispatch = useDispatch();
  const boardId = useSelector(selectCurrentBoardId);

  const handleRemoveColumn = useCallback(() => {
    dispatch(removeColumn({ columnId, boardId }));
  }, [dispatch, columnId, boardId]);

  const handleClearColumn = useCallback(() => {
    dispatch(clearColumn(columnId));
  }, [dispatch, columnId]);

  return (
    <div ref={container}>
      <Popover
        placement="bottom-start"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <IconButton
            icon={FiMoreHorizontal}
            label="List actions"
            color="gray.600"
            bg="transparent"
            _hover={{ backgroundColor: "rgba(9,30,66,.08)", color: "gray.700" }}
            _focus={{
              boxShadow: "none",
              backgroundColor: "hsla(0,0%,100%,0.2)",
              color: "gray.800"
            }}
            _active={{
              backgroundColor: "rgba(9,30,66,.20)",
              color: "gray.800"
            }}
          />
        </PopoverTrigger>
        <PopoverContent
          py={0}
          zIndex={4}
          boxShadow="md"
          cursor="default"
          _focus={{ boxShadow: "none", outline: "none" }}
        >
          <PopoverHeader textAlign="center" fontSize="0.9rem" opacity={0.8}>
            List Actions
          </PopoverHeader>
          <PopoverCloseButton
            opacity={0.6}
            _hover={{ opacity: 1 }}
            _active={{ boxShadow: "none" }}
          />
          <PopoverBody px={0} pb={0}>
            <ColumnActionsButton label="Lock List" onClick={() => {}} />
            <ColumnActionsButton
              label="Clear list"
              onClick={handleClearColumn}
              mb={0}
            />
            <Divider />
            <ColumnActionsButton label="Sort By..." onClick={() => {}} />
          </PopoverBody>
          <PopoverFooter px={0} pt={2} pb={1}>
            <ColumnActionsButton
              label="Remove List"
              onClick={handleRemoveColumn}
            />
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </div>
  );
};

ColumnActionsPopover.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnActionsPopover;
