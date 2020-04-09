import React from "react";
import BoardHeader from "./BoardHeader";
import ColumnList from "../../columns/components/ColumnList";
import CreateColumnForm from "../../columns/components/CreateColumnForm";

const MainBoard = () => {
  return (
    <div className="MainBoard">
      <BoardHeader />
      <ColumnList />
      <CreateColumnForm />
    </div>
  );
};

export default MainBoard;
