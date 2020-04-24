import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { actionsToggled, columnsSelectors } from "../columnsSlice";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton
} from "@chakra-ui/core";
import IconButton from "../../../components/IconButton";
import BackButton from "../../../components/BackButton";
import ActionsList from "./ActionsList";
import SortByList from "./SortByList";
import MoveList from "./MoveList";

const ColumnActionsPopover = ({ columnId }) => {
  const [action, setAction] = useState("main");

  const { is_open } = useSelector(state =>
    columnsSelectors.selectById(state, columnId)
  );

  const dispatch = useDispatch();

  const handleShowAction = useCallback(action => {
    setAction(action);
  }, []);

  const handleShowPrevious = useCallback(() => {
    setAction("main");
  }, []);

  const handleOpenPopover = useCallback(() => {
    dispatch(actionsToggled({ columnId, isOpen: true }));
  }, [dispatch, columnId]);

  const handleClosePopover = useCallback(() => {
    if (is_open) {
      dispatch(actionsToggled({ columnId, isOpen: false }));
      setAction("main");
    }
  }, [dispatch, columnId, is_open]);

  const container = useClickOutside(handleClosePopover, {
    close: { click: true, esc: true, enter: false }
  });

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
          {action !== "main" && (
            <BackButton
              fontSize="1.4rem"
              onClick={handleShowPrevious}
              top={1}
              zIndex={6}
            />
          )}
          <PopoverHeader textAlign="center" fontSize="0.9rem" opacity={0.8}>
            {action === "sort"
              ? "Sort List"
              : action === "move"
              ? "Move List"
              : "List Actions"}
          </PopoverHeader>
          <PopoverCloseButton
            opacity={0.6}
            _hover={{ opacity: 1 }}
            _active={{ boxShadow: "none" }}
          />
          <PopoverBody px={0} pb={0}>
            {action === "sort" ? (
              <SortByList columnId={columnId} />
            ) : action === "move" ? (
              <MoveList
                columnId={columnId}
                onShowPrevious={handleShowPrevious}
              />
            ) : (
              <ActionsList columnId={columnId} onShow={handleShowAction} />
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};

ColumnActionsPopover.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnActionsPopover;
