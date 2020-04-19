import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { selectCurrentBoardId } from "../../boards/boardsSlice";
import {
  removeColumn,
  clearColumn,
  actionsToggled,
  toggleLockColumn,
  columnsSelectors
} from "../columnsSlice";
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
  const { is_open, is_locked } = useSelector(state =>
    columnsSelectors.selectById(state, columnId)
  );

  const dispatch = useDispatch();

  const handleOpenPopover = useCallback(() => {
    dispatch(actionsToggled({ columnId, isOpen: true }));
  }, [dispatch, columnId]);

  const handleClosePopover = useCallback(() => {
    if (is_open) {
      dispatch(actionsToggled({ columnId, isOpen: false }));
    }
  }, [dispatch, columnId, is_open]);

  const container = useClickOutside(handleClosePopover);

  const boardId = useSelector(selectCurrentBoardId);

  const handleRemove = useCallback(() => {
    dispatch(removeColumn({ columnId, boardId }));
  }, [dispatch, columnId, boardId]);

  const handleClear = useCallback(() => {
    dispatch(clearColumn(columnId));
  }, [dispatch, columnId]);

  const handleToggleLock = useCallback(() => {
    dispatch(toggleLockColumn(columnId));
  }, [dispatch, columnId]);

  return (
    <div ref={container}>
      <Popover
        placement="bottom-start"
        isOpen={is_open}
        onOpen={handleOpenPopover}
        onClose={handleClosePopover}
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
            <ColumnActionsButton
              label={is_locked ? "Unlock List" : "Lock List"}
              onClick={handleToggleLock}
            />
            <ColumnActionsButton
              label="Clear list"
              onClick={handleClear}
              mb={0}
            />
            <Divider />
            <ColumnActionsButton label="Sort By..." onClick={() => {}} />
          </PopoverBody>
          <PopoverFooter px={0} pt={2} pb={1}>
            <ColumnActionsButton label="Remove List" onClick={handleRemove} />
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
