import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { columnsSelectors } from "../columnsSlice";
import { tasksSelectors } from "../../tasks/tasksSlice";
import ColumnTitle from "./ColumnTitle";
import CreateTaskForm from "../../tasks/components/CreateTaskForm";

const ColumnItem = ({ columnId }) => {
  const columns = useSelector(state => columnsSelectors.selectEntities(state));
  const tasks = useSelector(state => tasksSelectors.selectEntities(state));

  return (
    <div className="ColumnItem">
      <div
        key={columnId}
        style={{
          margin: "0 20px",
          border: "1px solid black",
          height: "14rem"
        }}
      >
        <ColumnTitle columnId={columnId} />
        {columns[columnId].tasks.map(task => (
          <p key={task}>{tasks[task]["content"]}</p>
        ))}
        <CreateTaskForm columnId={columnId} />
      </div>
    </div>
  );
};

ColumnItem.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnItem;
