import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBoardId } from "../../boards/boardsSlice";
import { removeColumn } from "../columnsSlice";
import ColumnTitle from "./ColumnTitle";
import CreateTaskForm from "../../tasks/components/CreateTaskForm";
import TaskList from "../../tasks/components/TaskList";

const ColumnItem = ({ columnId }) => {
  const dispatch = useDispatch();

  const currentBoardId = useSelector(selectCurrentBoardId);
  const remove = () => {
    dispatch(removeColumn({ columnId, boardId: currentBoardId }));
  };

  return (
    <div className="ColumnItem">
      <button onClick={remove}>delete</button>
      <div
        key={columnId}
        style={{
          margin: "0 20px",
          border: "1px solid black",
          height: "14rem"
        }}
      >
        <ColumnTitle columnId={columnId} />
        <TaskList columnId={columnId} />
        <CreateTaskForm columnId={columnId} />
      </div>
    </div>
  );
};

ColumnItem.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnItem;
