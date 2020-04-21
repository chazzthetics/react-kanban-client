import React from "react";
import { Flex, Box, Stack, Icon, Text, Tag, TagLabel } from "@chakra-ui/core";
import { FiAlignLeft, FiCheckSquare } from "react-icons/fi";

const TaskFooter = () => {
  return (
    <Stack isInline pt={1} spacing={3} alignItems="center">
      <Tag
        bg="yellow.300"
        size="sm"
        display="flex"
        alignItems="center"
        onClick={e => e.stopPropagation()}
      >
        <Icon name="time" size="0.875rem" mr={1} />
        <TagLabel fontWeight={400} fontSize="0.8rem">
          Apr 20
        </TagLabel>
      </Tag>
      <Box as={FiAlignLeft} fontSize="1rem" />
      <Flex className="Attachment" align="center">
        <Icon name="attachment" size="0.875rem" mr={1} />
        <Text fontSize="0.8rem" color="gray.800">
          1
        </Text>
      </Flex>
      <Flex className="CheckList" align="center">
        <Box as={FiCheckSquare} size="0.9rem" mr={1} />
        <Text fontSize="0.8rem" color="gray.800">
          0/2
        </Text>
      </Flex>
    </Stack>
  );
};

export default TaskFooter;
