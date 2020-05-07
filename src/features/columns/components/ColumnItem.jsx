import React from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import { PseudoBox, Flex, Box } from "@chakra-ui/core";
import ColumnHeader from "./ColumnHeader";
import CreateTaskForm from "../../tasks/components/CreateTaskForm";
import TaskList from "../../tasks/components/TaskList";

const ColumnItem = ({ columnId }) => {
  return (
    <PseudoBox
      px={2}
      mr={2}
      bg="#ebecf0"
      borderRadius={3}
      cursor="pointer"
      w="17rem"
    >
      <Box>
        <ColumnHeader columnId={columnId} />
      </Box>
      <Box maxH="74vh" overflowX="hidden" overflowY="auto">
        <Droppable droppableId={columnId} type="task">
          {(provided, snapshot) => (
            <Flex
              direction="column"
              minH="1px"
              w="100%"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <TaskList columnId={columnId} />
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </Box>
      <Box position="sticky" bottom={0}>
        <CreateTaskForm columnId={columnId} />
      </Box>
    </PseudoBox>
  );
};

ColumnItem.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnItem;

//FIXME: scrollbar and overflow
