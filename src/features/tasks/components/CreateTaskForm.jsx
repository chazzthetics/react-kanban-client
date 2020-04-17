import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { makeSelectColumnTaskCount } from "../../columns/columnsSlice";
import { createTask } from "../tasksSlice";
import { makeTask } from "../../../utils/makeEntity";
import { Box, useDisclosure } from "@chakra-ui/core";
import CreateTaskButton from "./CreateTaskButton";
import SaveButtonGroup from "../../../components/SaveButtonGroup";

const CreateTaskForm = ({ columnId }) => {
  const { register, handleSubmit, reset } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectColumnTaskCount = useMemo(makeSelectColumnTaskCount, []);
  const position = useSelector(state => selectColumnTaskCount(state, columnId));

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    ({ title }) => {
      if (title !== "") {
        const task = makeTask(title, position);
        dispatch(createTask({ task, columnId }));
        reset();
      }
    },
    [dispatch, reset, position, columnId]
  );

  return (
    <Box className="TaskForm" pb={2}>
      {!isOpen ? (
        <CreateTaskButton columnId={columnId} onShow={onOpen} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            type="text"
            placeholder="Enter a title for this card..."
            ref={register}
            name="title"
            autoFocus
            style={{
              width: "100%",
              fontSize: "0.875rem",
              borderRadius: "3px",
              padding: "6px 8px",
              resize: "none",
              minHeight: "66px",
              marginBottom: "6px",
              boxShadow:
                "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)"
            }}
          />
          <SaveButtonGroup label="Add Card" onClose={onClose} />
        </form>
      )}
    </Box>
  );
};

CreateTaskForm.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default CreateTaskForm;
