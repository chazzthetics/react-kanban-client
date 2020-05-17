import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { quickEditOpened } from "../tasksSlice";
import { FiEdit2 } from "react-icons/fi";
import { IconButton } from "@chakra-ui/core";

const QuickEditTrigger = ({ taskId }) => {
  const dispatch = useDispatch();

  const handleClick = useCallback(
    e => {
      e.stopPropagation();
      dispatch(quickEditOpened({ taskId }));
    },
    [dispatch, taskId]
  );

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
      onClick={handleClick}
    />
  );
};

QuickEditTrigger.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default QuickEditTrigger;
