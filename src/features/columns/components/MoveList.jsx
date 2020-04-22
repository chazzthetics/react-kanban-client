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
const MoveList = ({ columnId }) => {
  const dispatch = useDispatch();

  const { position } = useSelector(state =>
    columnsSelectors.selectById(state, columnId)
  );

  const currentBoardId = useSelector(selectCurrentBoardId);

  const { register, handleSubmit, watch, setValue } = useForm({
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
      if (selectedId !== currentBoardId) {
        const startOrder = startColumns.filter((_id, i) => i !== startIndex);
        const [removed] = [...startColumns].splice(startIndex, 1);
        const endOrder = [...endColumns];
        endOrder.splice(parseInt(data.position), 0, removed);

        dispatch(
          moveColumn({
            startBoardId: currentBoardId,
            endBoardId: selectedId,
            startOrder,
            endOrder
          })
        );

        dispatch(actionsToggled({ columnId, isOpen: false }));
      } else {
        const newOrder = reorder(
          endColumns,
          startIndex,
          parseInt(data.position)
        );

        dispatch(reorderColumn({ boardId: selectedId, newOrder }));
        setValue("position", position);
      }
    },
    [
      dispatch,
      columnId,
      endColumns,
      selectedId,
      currentBoardId,
      setValue,
      position,
      startColumns,
      startIndex
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
  columnId: PropTypes.string.isRequired
};

export default MoveList;
