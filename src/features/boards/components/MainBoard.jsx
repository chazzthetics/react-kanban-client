import React from "react";
import BoardHeader from "./BoardHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  boardsSelectors,
  selectCurrentBoard,
  selectCurrentBoardId
} from "../boardsSlice";
import { columnsSelectors, createColumn } from "../../columns/columnsSlice";
import { useForm } from "react-hook-form";
import { nanoid } from "../../../utils/nanoid";

const MainBoard = () => {
  const currentBoardId = useSelector(selectCurrentBoardId);
  const currentBoard = useSelector(selectCurrentBoard);
  const allColumns = useSelector(state =>
    columnsSelectors.selectEntities(state)
  );

  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();
  const columnCount = useSelector(state =>
    boardsSelectors.selectById(state, currentBoardId)
  )?.columns.length;

  const onSubmit = React.useCallback(
    data => {
      const column = {
        uuid: nanoid(),
        title: data.columnTitle,
        position: columnCount,
        is_locked: false,
        is_editing: false,
        tasks: []
      };
      dispatch(createColumn({ column, boardId: currentBoardId }));
      reset();
    },
    [dispatch, columnCount, currentBoardId, reset]
  );

  return (
    <div className="MainBoard">
      <BoardHeader />
      <div className="ColumnList">
        {currentBoard &&
          currentBoard.columns.map(column => (
            <div key={column}>{allColumns[column].title}</div>
          ))}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Add new list"
            style={{ border: "1px solid black" }}
            name="columnTitle"
            ref={register}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default MainBoard;
