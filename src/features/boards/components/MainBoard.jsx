import React from "react";
import BoardHeader from "./BoardHeader";
import { useSelector } from "react-redux";
import { boardsSelectors, selectCurrentBoard } from "../boardsSlice";
import { columnsSelectors } from "../../columns/columnsSlice";

const MainBoard = () => {
  const currentBoard = useSelector(selectCurrentBoard);
  const allColumns = useSelector(state =>
    columnsSelectors.selectEntities(state)
  );

  return (
    <div className="MainBoard">
      <BoardHeader />
      <div className="ColumnList">
        {currentBoard &&
          currentBoard.columns.map(column => (
            <div key={column}>{allColumns[column].title}</div>
          ))}
        <form onSubmit={() => {}}>
          <input
            type="text"
            placeholder="Add new list"
            style={{ border: "1px solid black" }}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default MainBoard;
