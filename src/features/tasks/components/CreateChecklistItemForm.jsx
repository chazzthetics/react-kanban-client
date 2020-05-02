import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addItemToChecklist } from "../tasksSlice";
import { Box, Input } from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { makeChecklistItem } from "../../../utils/makeEntity";
import SaveButtonGroup from "../../../components/SaveButtonGroup";
import LightButton from "../../../components/LightButton";

const CreateChecklistItemForm = ({ taskId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(isOpen => !isOpen);
  };

  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = useCallback(
    data => {
      const item = makeChecklistItem(data.item);
      dispatch(addItemToChecklist({ taskId, item }));
      reset();
    },
    [dispatch, taskId, reset]
  );

  return (
    <Box ml={8} my={2}>
      {isOpen ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            size="sm"
            name="item"
            placeholder="Add an item"
            borderRadius={2}
            autoFocus
            mb={2}
            ref={register({ required: true })}
          />
          <SaveButtonGroup label="Add" onClose={handleToggle} />
        </form>
      ) : (
        <LightButton label="Add an item" onClick={handleToggle} />
      )}
    </Box>
  );
};

CreateChecklistItemForm.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default CreateChecklistItemForm;
