import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBoardId } from "../../boards/boardsSlice";
import {
  columnsSelectors,
  toggleLockColumn,
  clearColumn,
  removeColumn
} from "../columnsSlice";
import ColumnActionsButton from "./ColumnActionButton";
import { PopoverFooter, Divider } from "@chakra-ui/core";

const ActionsList = ({ columnId, onShow }) => {
  const boardId = useSelector(selectCurrentBoardId);

  const dispatch = useDispatch();

  const { is_locked, tasks } = useSelector(state =>
    columnsSelectors.selectById(state, columnId)
  );

  const hasTasks = useMemo(() => tasks.length > 1, [tasks]);

  const handleToggleLock = useCallback(() => {
    dispatch(toggleLockColumn(columnId));
  }, [dispatch, columnId]);

  const handleClear = useCallback(() => {
    dispatch(clearColumn(columnId));
  }, [dispatch, columnId]);

  const handleRemove = useCallback(() => {
    dispatch(removeColumn({ columnId, boardId }));
  }, [dispatch, columnId, boardId]);

  return (
    <>
      <ColumnActionsButton
        label={is_locked ? "Unlock List" : "Lock List"}
        onClick={handleToggleLock}
      />
      <ColumnActionsButton label="Clear List" onClick={handleClear} />
      <ColumnActionsButton
        label="Move List"
        onClick={() => {}}
        mb={hasTasks ? 0 : 2}
      />
      {hasTasks && (
        <>
          <Divider />
          <ColumnActionsButton label="Sort By..." onClick={onShow} mb={2} />
        </>
      )}
      <PopoverFooter px={0} pt={2} pb={1}>
        <ColumnActionsButton label="Remove List" onClick={handleRemove} />
      </PopoverFooter>
    </>
  );
};

ActionsList.propTypes = {
  columnId: PropTypes.string.isRequired,
  onShow: PropTypes.func.isRequired
};

export default ActionsList;
