import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { columnsSelectors, toggleLockColumn } from "../columnsSlice";
import IconButton from "../../../components/IconButton";

const LockColumnButton = ({ columnId }) => {
  const dispatch = useDispatch();

  const { is_locked } = useSelector(state =>
    columnsSelectors.selectById(state, columnId)
  );

  const handleToggleLock = useCallback(() => {
    dispatch(toggleLockColumn(columnId));
  }, [dispatch, columnId]);

  return (
    <IconButton
      label="Lock list"
      icon={is_locked ? "lock" : "unlock"}
      color="gray.600"
      fontSize="0.875rem"
      bg="transparent"
      _hover={{
        backgroundColor: "rgba(9,30,66,.08)",
        color: "gray.700",
        opacity: 1
      }}
      _focus={{
        boxShadow: "none",
        backgroundColor: "hsla(0,0%,100%,0.2)",
        color: "gray.800"
      }}
      _active={{
        backgroundColor: "rgba(9,30,66,.20)",
        color: "gray.800"
      }}
      opacity={is_locked ? 1 : 0}
      onClick={handleToggleLock}
    />
  );
};

LockColumnButton.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default LockColumnButton;
