import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useEditable } from "../../../hooks/useEditable";
import { tasksSelectors, updateTaskDescription } from "../tasksSlice";
import { FiAlignLeft } from "react-icons/fi";
import { Box, Textarea } from "@chakra-ui/core";
import SaveButtonGroup from "../../../components/SaveButtonGroup";

const EditTaskDescription = ({ taskId }) => {
  const task = useSelector(state => tasksSelectors.selectById(state, taskId));

  const [description, handleChange] = useEditable(task, "description");

  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(updateTaskDescription({ taskId, description }));
    },
    [dispatch, taskId, description]
  );

  return (
    <>
      <Box gridColumn="1 / 2">
        <Box as={FiAlignLeft} mr={2} fontSize="1.4rem" />
      </Box>
      <Box
        gridColumn="2 / 3"
        gridRow="2"
        fontSize="1rem"
        fontWeight={600}
        lineHeight="21px"
        textAlign="left"
      >
        <Box ml={"-2px"} mb={4}>
          Description
        </Box>
        <Box gridColumn="2 / 3">
          <form onSubmit={handleSubmit}>
            <Textarea
              borderRadius={2}
              fontSize="0.875rem"
              py={2}
              px={1}
              mb={2}
              ml={-1}
              resize="none"
              value={description || ""}
              onChange={handleChange}
            />
            <SaveButtonGroup onClose={() => {}} ml={-1} />
          </form>
        </Box>
      </Box>
    </>
    // <form onSubmit={handleSubmit}>
    //   <Textarea
    //     size="sm"
    //     resize="none"
    //     px={2}
    //     mb={2}
    //     borderRadius={2}
    //     fontSize="0.875rem"
    //     color="gray.800"
    //     bg={!task.description ? "rgba(9,30,66,.04)" : "#f4f5f7"}
    //     borderColor={!task.description ? "rgba(9,30,66,.04)" : "#f4f5f7"}
    //     minH={task.description ? "6rem" : "5.5rem"}
    //     cursor="pointer"
    //     autoCorrect="no"
    //     placeholder="Add a more detailed description..."
    //     _hover={{
    //       backgroundColor: "hsla(0,0%,0%,0.075)"
    //     }}
    //     _focus={{
    //       backgroundColor: "white",
    //       boxShadow: "0 0 0 1px #3182ce",
    //       borderColor: "#3182ce",
    //       minHeight: "7rem"
    //     }}
    //     _placeholder={{ color: "gray.400" }}
    //     _active={{
    //       backgroundColor: "blue.50",
    //       borderColor: "blue.50",
    //       boxShadow: "none"
    //     }}
    //     value={description || ""}
    //     onChange={handleChange}
    //   />
    // </form>
  );
};

EditTaskDescription.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default React.memo(EditTaskDescription);
