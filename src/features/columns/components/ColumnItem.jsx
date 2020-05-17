import React, { memo } from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import { PseudoBox, Flex, Box } from "@chakra-ui/core";
import ColumnHeader from "./ColumnHeader";
import CreateTaskForm from "../../tasks/components/CreateTaskForm";
import TaskList from "../../tasks/components/TaskList";

//FIXME:
const overflown = (clientHeight, scrollHeight) => {
  return scrollHeight > clientHeight;
};

const ColumnItem = ({ columnId }) => {
  const scrollRef = React.useRef(null);
  // const [isOverflow, setIsOverflow] = React.useState(false);

  // React.useEffect(() => {
  //   if (scrollRef.current) {
  //     if (
  //       overflown(
  //         scrollRef.current.clientHeight,
  //         scrollRef.current.scrollHeight
  //       )
  //     ) {
  //       setIsOverflow(true);
  //     }
  //   }
  // }, [scrollRef]);

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
      <Box
        maxH="70vh"
        overflowX="hidden"
        overflowY="hidden"
        // overflowY="auto"
        // overflowY={isOverflow ? "auto" : "hidden"}
        className="scrollbar"
        ref={scrollRef}
      >
        <Droppable droppableId={columnId} type="task">
          {(provided, snapshot) => (
            <Flex
              direction="column"
              minH="1px"
              flexBasis="100%"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <TaskList columnId={columnId} />
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </Box>
      <CreateTaskForm columnId={columnId} />
    </PseudoBox>
  );
};

ColumnItem.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default memo(ColumnItem);
