import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import {
  hydrate,
  createBoard,
  boardsSelectors
} from "../features/boards/boardsSlice";
import {
  columnsSelectors,
  removeColumn,
  createColumn
} from "../features/columns/columnsSlice";
import {
  tasksSelectors,
  createTask,
  removeTask
} from "../features/tasks/tasksSlice";
import { nanoid } from "nanoid";
import AppBar from "../components/AppBar";

const App = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(login());
  };

  const handleGetBoards = () => {
    dispatch(hydrate());
  };

  const currentBoard = useSelector(state => state.boards.current);
  const columnCount = useSelector(state =>
    boardsSelectors.selectById(state, currentBoard)
  )?.columns.length;

  const addColumn = () => {
    const column = {
      uuid: nanoid(),
      title: "Column One",
      position: columnCount,
      is_locked: false,
      is_editing: false,
      tasks: []
    };
    dispatch(createColumn({ column, boardId: currentBoard }));
  };

  const addTask = columnId => {
    const task = {
      uuid: nanoid(),
      content: "Another task",
      is_locked: false,
      is_editing: false,
      position: 1
    };
    dispatch(createTask({ task, columnId }));
  };

  const addBoard = () => {
    const board = {
      uuid: nanoid(),
      title: "Board One",
      slug: "board-one",
      color: "yellow",
      is_current: true,
      is_starred: false,
      columns: [],
      is_editing: false
    };
    dispatch(createBoard(board));
  };

  const handleRemoveColumn = columnId => {
    dispatch(removeColumn({ columnId, boardId: currentBoard }));
  };

  const boards = useSelector(state => boardsSelectors.selectEntities(state));
  const columns = useSelector(state => columnsSelectors.selectEntities(state));
  const tasks = useSelector(state => tasksSelectors.selectEntities(state));

  const handleDeleteTask = ({ taskId, columnId }) => {
    dispatch(removeTask({ taskId, columnId }));
  };

  return (
    <div className="App">
      <AppBar />
      <div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleGetBoards}>Get Boards</button>
        <button onClick={addBoard}>Create Board</button>
        <button onClick={addColumn}>Add Column</button>
      </div>
      <h1>App</h1>
      <h1>{boards[currentBoard]?.title}</h1>
      <div>
        {boards[currentBoard]?.columns.map(column => (
          <div key={column}>
            <h1>{columns[column].title}</h1>
            <button onClick={() => handleRemoveColumn(column)}>
              Delete Column
            </button>
            {columns[column].tasks.map(task => (
              <div key={task}>
                <li>{tasks[task].content}</li>
                <button
                  onClick={() =>
                    handleDeleteTask({ taskId: task, columnId: column })
                  }
                >
                  &times;
                </button>
              </div>
            ))}
            <button onClick={() => addTask(column)}>Add Task</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
