import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  tasksSelectors,
  addItemToChecklist,
  toggleChecklistItem
} from "../tasksSlice";
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
  ListItem,
  Input
} from "@chakra-ui/core";
import SaveButtonGroup from "../../../components/SaveButtonGroup";
import { useForm } from "react-hook-form";
import { makeChecklistItem } from "../../../utils/makeEntity";

const EditTaskChecklist = ({ taskId }) => {
  const { checklist } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

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

  const handleToggleComplete = useCallback(
    itemId => {
      dispatch(toggleChecklistItem({ taskId, itemId }));
    },
    [dispatch, taskId]
  );

  console.log(checklist);

  const calculateProgressValue = useMemo(() => {
    const totalItems = checklist.items.length;
    const completedItems = checklist.items.filter(item => item.completed)
      .length;
    return totalItems ? (completedItems / totalItems) * 100 : 0;
  }, [checklist.items]);

  return (
    <Box pt={4} pb={6}>
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
              alignSelf="center"
            >
              {checklist.title}
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
        <Box w="100%" mr={1}>
          <Progress
            size="sm"
            borderRadius={3}
            value={calculateProgressValue}
            bg="gray.200"
          />
        </Box>
      </Flex>

      <List className="ChecklistListGroup">
        {checklist.items &&
          checklist.items.map(item => (
            <ListItem key={item.uuid} pb={4} className="CheckListItem">
              <Flex align="center">
                <Checkbox
                  size="lg"
                  mr={4}
                  isChecked={item.completed}
                  name="completed"
                  onChange={() => handleToggleComplete(item.uuid)}
                />
                <Text fontSize="0.8rem">{item.title}</Text>
              </Flex>
            </ListItem>
          ))}
      </List>

      {isOpen ? (
        <Box ml={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              size="sm"
              name="item"
              my={2}
              placeholder="Add an item"
              borderRadius={2}
              autoFocus
              ref={register({ required: true })}
            />
            <SaveButtonGroup label="Add" onClose={handleToggle} />
          </form>
        </Box>
      ) : (
        <Button
          size="sm"
          fontWeight={400}
          h="2rem"
          fontSize="0.875rem"
          backgroundColor="#ebecf0"
          _focus={{ boxShadow: "none" }}
          ml={8}
          onClick={handleToggle}
        >
          Add an item
        </Button>
      )}
    </Box>
  );
};

export default EditTaskChecklist;
