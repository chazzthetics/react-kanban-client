import React from "react";
import { Stack, PseudoBox } from "@chakra-ui/core";

const TaskLabelList = () => {
  return (
    <Stack isInline spacing={1} mb={1}>
      <PseudoBox
        bg="green.400"
        h="8px"
        w="2.5rem"
        borderRadius={4}
        _hover={{ backgroundColor: "green.500" }}
        onClick={e => e.stopPropagation()}
      />
      <PseudoBox
        bg="yellow.400"
        h="8px"
        w="2.5rem"
        borderRadius={4}
        _hover={{ backgroundColor: "yellow.500" }}
        onClick={e => e.stopPropagation()}
      />
    </Stack>
  );
};

export default TaskLabelList;
