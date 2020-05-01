import React from "react";
import PropTypes from "prop-types";
import { FiCheckSquare } from "react-icons/fi";
import {
  Flex,
  Box,
  Heading,
  Button,
  Progress,
  Checkbox,
  Text,
  List,
  ListItem
} from "@chakra-ui/core";

const EditTaskChecklist = ({ taskId }) => {
  return (
    <Box pt={4} py={6}>
      <Flex align="flex-start">
        <Box as={FiCheckSquare} mr={4} fontSize="1.4rem" />
        <Box w="100%">
          <Flex justify="space-between" align="baseline">
            <Heading
              as="h3"
              fontSize="1rem"
              fontWeight={600}
              lineHeight="21px"
              ml={"-2px"}
              mb={3}
            >
              Checklist
            </Heading>
            <Button
              size="sm"
              fontWeight={400}
              h="2rem"
              fontSize="0.875rem"
              backgroundColor="#ebecf0"
              mr={1}
              _focus={{ boxShadow: "none" }}
            >
              Delete
            </Button>
          </Flex>
        </Box>
      </Flex>
      <Flex align="center" pb={2}>
        <Box fontSize="0.7rem" ml={1} mr={4} textAlign="center">
          0%
        </Box>
        <Box w="100%">
          <Progress size="sm" borderRadius={3} />
        </Box>
      </Flex>
      <List>
        <ListItem pb={4}>
          <Flex align="center">
            <Checkbox size="lg" mr={4} />
            <Text fontSize="0.8rem">Task One</Text>
          </Flex>
        </ListItem>
        <ListItem pb={4}>
          <Flex align="center">
            <Checkbox size="lg" mr={4} />
            <Text fontSize="0.8rem">Task Two</Text>
          </Flex>
        </ListItem>
      </List>
      <Button
        size="sm"
        fontWeight={400}
        h="2rem"
        fontSize="0.875rem"
        backgroundColor="#ebecf0"
        _focus={{ boxShadow: "none" }}
        ml={8}
      >
        Add an item
      </Button>
    </Box>
  );
};

export default EditTaskChecklist;
