import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  columnsSelectors,
  reorderColumn,
  moveColumn,
  actionsToggled
} from "../columnsSlice";
import {
  selectCurrentBoardId,
  boardsSelectors
} from "../../boards/boardsSlice";
import { reorder } from "../../../utils/reorder";
import { Box } from "@chakra-ui/core";
import SelectBox from "../../../components/SelectBox";
import SaveButton from "../../../components/SaveButton";

//FIXME: refactor
const MoveList = ({ columnId, onShowPrevious }) => {
  const dispatch = useDispatch();

  const currentBoardId = useSelector(selectCurrentBoardId);

  const { position } = useSelector(state =>
    columnsSelectors.selectById(state, columnId)
  );

  const { register, handleSubmit, watch } = useForm({
    defaultValues: { board: currentBoardId, position }
  });

  const boards = useSelector(state => boardsSelectors.selectAll(state));
  const selectedId = watch("board");

  const { columns: startColumns } = useSelector(state =>
    boardsSelectors.selectById(state, currentBoardId)
  );

  const { columns: endColumns } = useSelector(state =>
    boardsSelectors.selectById(state, selectedId)
  );

  const startIndex = startColumns.indexOf(columnId);

  const onSubmit = useCallback(
    data => {
      const endIndex = parseInt(data.position);
      if (endIndex === startIndex && currentBoardId === selectedId) {
        return;
      }

      // Move column to another board
      if (selectedId !== currentBoardId) {
        const startOrder = startColumns.filter((_id, i) => i !== startIndex);
        const [removed] = [...startColumns].splice(startIndex, 1);
        const endOrder = [...endColumns];
        endOrder.splice(endIndex, 0, removed);

        dispatch(
          moveColumn({
            startBoardId: currentBoardId,
            endBoardId: selectedId,
            startOrder,
            endOrder
          })
        );
      } else {
        // Reorder column
        const newOrder = reorder(endColumns, startIndex, endIndex);
        dispatch(reorderColumn({ boardId: selectedId, newOrder }));
      }
      // Close popover and set content to main after submit
      onShowPrevious("main");
      dispatch(actionsToggled({ columnId, isOpen: false }));
    },
    [
      dispatch,
      columnId,
      currentBoardId,
      selectedId,
      startColumns,
      endColumns,
      startIndex,
      onShowPrevious
    ]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box px={3} pb={4}>
        <SelectBox label="Board" name="board" ref={register}>
          {boards.map(board => (
            <option key={board.uuid} value={board.uuid}>
              {board.title}
            </option>
          ))}
        </SelectBox>

        <SelectBox label="Position" name="position" ref={register}>
          {endColumns.map((column, index) => (
            <option key={column} value={index}>
              {index + 1}
            </option>
          ))}
          {currentBoardId !== selectedId && (
            <option key="last" value={endColumns.length}>
              {endColumns.length + 1}
            </option>
          )}
        </SelectBox>

        <SaveButton label="Move" mt={2} px={6} />
      </Box>
    </form>
  );
};

MoveList.propTypes = {
  columnId: PropTypes.string.isRequired,
  onShowPrevious: PropTypes.func.isRequired
};

export default MoveList;
