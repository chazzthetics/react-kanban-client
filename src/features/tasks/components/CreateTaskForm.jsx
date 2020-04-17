import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { makeSelectColumnTaskCount } from "../../columns/columnsSlice";
import { createTask } from "../tasksSlice";
import { makeTask } from "../../../utils/makeEntity";
import { Box, Textarea, useDisclosure } from "@chakra-ui/core";
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
          <Textarea
            type="text"
            placeholder="Enter a title for this card..."
            ref={register}
            name="title"
            autoFocus
            width="100%"
            fontSize="0.875rem"
            borderRadius={2}
            py={1}
            px={2}
            resize="none"
            minHeight="66px"
            marginBottom="6px"
            boxShadow="md"
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
