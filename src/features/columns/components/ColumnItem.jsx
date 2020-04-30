import React, { memo } from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import { PseudoBox, Flex, Box } from "@chakra-ui/core";
import ColumnHeader from "./ColumnHeader";
import CreateTaskForm from "../../tasks/components/CreateTaskForm";
import TaskList from "../../tasks/components/TaskList";

const ColumnItem = ({ columnId }) => {
  return (
    <PseudoBox
      className="ColumnItem "
      w="17rem"
      bg="#ebecf0"
      mx={2}
      borderRadius={3}
      cursor="pointer"
      _first={{ marginLeft: 0 }}
      shadow="md"
    >
      <Box w="100%" px={2} height="100%">
        <ColumnHeader columnId={columnId} />
        <Droppable droppableId={columnId} type="task">
          {provided => (
            <Flex
              className="scrollbar"
              overflowY="auto"
              overflowX="hidden"
              maxH="80vh"
              direction="column"
              minH="1px"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <TaskList columnId={columnId} />
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
        <CreateTaskForm columnId={columnId} />
      </Box>
    </PseudoBox>
  );
};

ColumnItem.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default memo(ColumnItem);
