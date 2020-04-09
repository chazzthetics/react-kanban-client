import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentBoard } from "../../boards/boardsSlice";
import ColumnItem from "./ColumnItem";

const ColumnList = () => {
  const currentBoard = useSelector(selectCurrentBoard);

  return (
    <div className="ColumnList" style={{ display: "flex" }}>
      {currentBoard &&
        currentBoard.columns.map(column => (
          <ColumnItem key={column} columnId={column} />
        ))}
    </div>
  );
};

export default ColumnList;
