import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useFocus } from "../../../hooks/useFocus";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { makeSelectColumnTaskCount } from "../../columns/columnsSlice";
import { createTask } from "../tasksSlice";
import { makeTask } from "../../../utils/makeEntity";
import { Box, Textarea, useDisclosure } from "@chakra-ui/core";
import CreateTaskButton from "./CreateTaskButton";
import SaveButtonGroup from "../../../components/SaveButtonGroup";

const CreateTaskForm = ({ columnId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const focusRef = useFocus();
  const { register, handleSubmit, reset } = useForm();

  const selectColumnTaskCount = useMemo(makeSelectColumnTaskCount, []);
  const position = useSelector(state => selectColumnTaskCount(state, columnId));

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    ({ title }) => {
      const task = makeTask(title, position);
      dispatch(createTask({ task, columnId }));
      reset();
      onOpen();
    },
    [dispatch, reset, position, columnId, onOpen]
  );

  //FIXME: fix enter?
  const container = useClickOutside(
    onClose,
    {
      submit: {
        click: true,
        esc: false,
        enter: false
      },
      close: {
        click: true,
        esc: true,
        enter: false
      }
    },
    handleSubmit(onSubmit)
  );

  //FIXME: borderradius
  return (
    <Box className="TaskForm" pb={2} pt={"2px"}>
      {!isOpen ? (
        <CreateTaskButton columnId={columnId} onShow={onOpen} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} ref={container}>
          <Textarea
            type="text"
            placeholder="Enter a title for this card..."
            ref={e => {
              register(e, { required: true });
              focusRef.current = e;
            }}
            name="title"
            width="100%"
            fontSize="0.875rem"
            borderRadius={2}
            py={1}
            px={2}
            mb={2}
            resize="none"
            minHeight="66px"
            marginBottom="6px"
            autoFocus
            boxShadow="sm"
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
