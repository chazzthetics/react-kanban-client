import React from "react";
import BoardHeader from "./BoardHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  boardsSelectors,
  selectCurrentBoard,
  selectCurrentBoardId
} from "../boardsSlice";
import { columnsSelectors, createColumn } from "../../columns/columnsSlice";
import { tasksSelectors, createTask } from "../../tasks/tasksSlice";
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

  const taskCount = useSelector(state =>
    columnsSelectors.selectById(state, "bGnHH7u6kdWuNkdvo5eCZ")
  )?.tasks.length;
  const onSubmit = React.useCallback(
    data => {
      if (data.columnTitle) {
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
      } else {
        const task = {
          uuid: nanoid(),
          content: data.taskContent,
          is_locked: false,
          is_editing: false,
          position: taskCount
        };
        dispatch(createTask({ task, columnId: "bGnHH7u6kdWuNkdvo5eCZ" }));
        reset();
      }
    },
    [dispatch, columnCount, currentBoardId, reset, taskCount]
  );

  const tasks = useSelector(state => tasksSelectors.selectEntities(state));
  return (
    <div className="MainBoard">
      <BoardHeader />
      <div className="ColumnList" style={{ display: "flex" }}>
        {currentBoard &&
          currentBoard.columns.map(column => (
            <div
              key={column}
              style={{
                margin: "0 20px",
                border: "1px solid black",
                height: "14rem"
              }}
            >
              {allColumns[column].title}
              {allColumns[column].tasks.map(task => (
                <p key={task}>{tasks[task]["content"]}</p>
              ))}
              <div className="TaskForm">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    placeholder="Add Task"
                    style={{ border: "1px solid black" }}
                    ref={register}
                    name="taskContent"
                  />
                </form>
              </div>
            </div>
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
