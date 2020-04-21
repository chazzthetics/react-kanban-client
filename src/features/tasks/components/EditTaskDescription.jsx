import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useEditable } from "../../../hooks/useEditable";
import { tasksSelectors } from "../tasksSlice";
import { FiAlignLeft } from "react-icons/fi";
import { Textarea } from "@chakra-ui/core";
import SaveButtonGroup from "../../../components/SaveButtonGroup";
import ContentHeading from "../../../components/Description/ContentHeading";

const EditTaskDescription = ({ taskId }) => {
  const task = useSelector(state => tasksSelectors.selectById(state, taskId));

  const [description, handleChange] = useEditable(task, "description");
  const handleSubmit = () => {};

  return (
    <>
      <ContentHeading
        icon={FiAlignLeft}
        heading="Description"
        action={null} //FIXME: edit button
        px={0}
      />
      <form onSubmit={handleSubmit}>
        <Textarea
          size="sm"
          resize="none"
          px={2}
          mb={2}
          borderRadius={2}
          fontSize="0.875rem"
          color="gray.800"
          bg={!task.description ? "rgba(9,30,66,.04)" : "#f4f5f7"}
          borderColor={!task.description ? "rgba(9,30,66,.04)" : "#f4f5f7"}
          minH={task.description ? "6rem" : "5.5rem"}
          cursor="pointer"
          autoCorrect="no"
          placeholder="Add a more detailed description..."
          _hover={{
            backgroundColor: "hsla(0,0%,0%,0.075)"
          }}
          _focus={{
            backgroundColor: "white",
            boxShadow: "0 0 0 1px #3182ce",
            borderColor: "#3182ce",
            minHeight: "7rem"
          }}
          _placeholder={{ color: "gray.400" }}
          _active={{
            backgroundColor: "blue.50",
            borderColor: "blue.50",
            boxShadow: "none"
          }}
          value={description || ""}
          onChange={handleChange}
        />
        <SaveButtonGroup onClose={() => {}} />
      </form>
    </>
  );
};

EditTaskDescription.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default EditTaskDescription;
