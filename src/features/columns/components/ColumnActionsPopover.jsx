import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
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
  Divider
} from "@chakra-ui/core";
import IconButton from "../../../components/IconButton";
import ColumnActionsButton from "./ColumnActionButton";

const ColumnActionsPopover = ({ columnId }) => {
  const dispatch = useDispatch();
  const boardId = useSelector(selectCurrentBoardId);

  const handleRemoveColumn = useCallback(() => {
    dispatch(removeColumn({ columnId, boardId }));
  }, [dispatch, columnId, boardId]);

  const handleClearColumn = useCallback(() => {
    dispatch(clearColumn(columnId));
  }, [dispatch, columnId]);

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <IconButton
          icon={FiMoreHorizontal}
          label="Column actions"
          color="gray.600"
          bg="transparent"
          _hover={{ backgroundColor: "rgba(9,30,66,.08)", color: "gray.700" }}
          _focus={{
            boxShadow: "none",
            backgroundColor: "hsla(0,0%,100%,0.2)",
            color: "gray.800"
          }}
          _active={{ backgroundColor: "rgba(9,30,66,.13)", color: "gray.800" }}
        />
      </PopoverTrigger>
      <PopoverContent
        py={0}
        zIndex={4}
        boxShadow="md"
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
  );
};

ColumnActionsPopover.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnActionsPopover;
