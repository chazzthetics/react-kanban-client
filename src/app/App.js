import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { fetchBoards, boardsSelectors } from "../features/boards/boardsSlice";
import { columnsSelectors } from "../features/columns/columnsSlice";
import AppBar from "../components/AppBar";

const App = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(login());
  };

  const handleGetBoards = () => {
    dispatch(fetchBoards());
  };

  const boards = useSelector(state => boardsSelectors.selectAll(state));
  const columns = useSelector(state => columnsSelectors.selectEntities(state));
  console.log(columns);

  return (
    <div className="App">
      <AppBar />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGetBoards}>Get Boards</button>
      <h1>App</h1>
      <div>
        {boards.map(board => (
          <ul key={board.uuid}>
            <li>{board.title}</li>
            <ul>
              {board.columns.map(column => (
                <li key={column}>{columns[column].title}</li>
              ))}
            </ul>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default App;
