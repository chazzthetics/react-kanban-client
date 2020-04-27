import React from "react";
import PropTypes from "prop-types";
import { PseudoBox, Box, Text, Flex, Icon } from "@chakra-ui/core";
import TaskLabelList from "./TaskLabelList";
import LabelsPopover from "../../labels/components/LabelsPopover";

//TODO: style
const EditTaskModalLabelList = ({ taskId }) => {
  return (
    <Box gridColumn="2 / 4" gridRow="1" alignSelf="end">
      <Text
        fontSize="0.8rem"
        textTransform="uppercase"
        fontWeight={500}
        color="gray.600"
        my={2}
      >
        Labels
      </Text>
      <Flex>
        <TaskLabelList
          taskId={taskId}
          h="30px"
          w="40px"
          borderRadius={4}
          cursor="pointer"
        />
        <LabelsPopover
          taskId={taskId}
          trigger={
            <PseudoBox
              cursor="pointer"
              h="30px"
              w="35px"
              borderRadius={4}
              bg="hsla(0,0%,0%,0.05)"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              ml={1}
              _hover={{ backgroundColor: "hsla(0,0%,0%,0.1)" }}
              _active={{ backgroundColor: "hsla(0,0%,0%,0.2)" }}
              transition="background-color 100ms ease-in"
            >
              <Icon name="add" fontSize="0.8rem" color="gray.600" />
            </PseudoBox>
          }
        />
      </Flex>
    </Box>
  );
};

EditTaskModalLabelList.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default EditTaskModalLabelList;
