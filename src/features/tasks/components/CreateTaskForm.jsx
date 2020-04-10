import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { makeSelectColumnTaskCount } from "../../columns/columnsSlice";
import { createTask } from "../tasksSlice";
import { makeTask } from "../../../utils/makeEntity";

const CreateTaskForm = ({ columnId }) => {
  const { register, handleSubmit, reset } = useForm();

  const selectColumnTaskCount = useMemo(makeSelectColumnTaskCount, []);
  const position = useSelector(state => selectColumnTaskCount(state, columnId));

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    data => {
      const task = makeTask(data.taskContent, position);
      dispatch(createTask({ task, columnId }));
      reset();
    },
    [dispatch, reset, position, columnId]
  );

  return (
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
  );
};

CreateTaskForm.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default CreateTaskForm;
