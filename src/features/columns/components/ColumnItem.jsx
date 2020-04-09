import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { columnsSelectors } from "../columnsSlice";
import { tasksSelectors, createTask } from "../../tasks/tasksSlice";
import { useForm } from "react-hook-form";
import { nanoid } from "../../../utils/nanoid";

const ColumnItem = ({ columnId }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const taskCount = useSelector(state =>
    columnsSelectors.selectById(state, columnId)
  )?.tasks.length;

  const columns = useSelector(state => columnsSelectors.selectEntities(state));
  const tasks = useSelector(state => tasksSelectors.selectEntities(state));

  const onSubmit = React.useCallback(
    data => {
      const task = {
        uuid: nanoid(),
        content: data.taskContent,
        is_locked: false,
        is_editing: false,
        position: taskCount
      };
      dispatch(createTask({ task, columnId }));
      reset();
    },
    [dispatch, reset, taskCount, columnId]
  );

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
        {columns[columnId].title}
        {columns[columnId].tasks.map(task => (
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
    </div>
  );
};

ColumnItem.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnItem;
