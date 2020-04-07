import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import {
  fetchBoards,
  createBoard,
  boardsSelectors
} from "../features/boards/boardsSlice";
import {
  columnsSelectors,
  createColumn
} from "../features/columns/columnsSlice";
import AppBar from "../components/AppBar";

const App = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(login());
  };

  const handleGetBoards = () => {
    dispatch(fetchBoards());
  };

  const currentBoard = useSelector(state => state.boards.current);
  const columnCount = useSelector(state =>
    boardsSelectors.selectById(state, currentBoard)
  )?.columns.length;

  console.log(columnCount);
  const addColumn = () => {
    const column = {
      uuid: "column1x",
      title: "Column One",
      position: columnCount,
      is_locked: false,
      is_editing: false
    };
    dispatch(createColumn({ column, uuid: currentBoard }));
  };

  const addBoard = () => {
    const board = {
      uuid: "board1",
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

  const boards = useSelector(state => boardsSelectors.selectEntities(state));
  const columns = useSelector(state => columnsSelectors.selectEntities(state));

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
          <li key={column}>{columns[column].title}</li>
        ))}
      </div>
    </div>
  );
};

export default App;
