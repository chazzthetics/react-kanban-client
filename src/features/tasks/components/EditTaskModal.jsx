import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useEditable } from "../../../hooks/useEditable";
import { tasksSelectors } from "../tasksSlice";
import {
  Box,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  Grid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Link,
  Textarea
} from "@chakra-ui/core";
import { columnsSelectors } from "../../columns/columnsSlice";
import { FiCreditCard, FiAlignLeft } from "react-icons/fi";

const EditTaskModal = ({ taskId, columnId, isOpen, onClose }) => {
  const task = useSelector(state => tasksSelectors.selectById(state, taskId));
  const { title: columnTitle } = useSelector(state =>
    columnsSelectors.selectById(state, columnId)
  );

  const [taskTitle, handleChange] = useEditable(task, "title");

  //FIXME: fix styling...
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="48rem" borderRadius={3} bg="#f4f5f7">
        <ModalCloseButton
          zIndex={6}
          color="gray.600"
          _hover={{ backgroundColor: "rgba(0,0,0,0.07)" }}
          _active={{ backgroundColor: "rgba(0,0,0,0.1)", color: "gray.800" }}
          _focus={{ outline: "none" }}
          borderRadius={50}
        />
        <ModalHeader fontSize="1.2rem" cursor="pointer" onClick={() => {}}>
          <Flex align="center">
            <Box as={FiCreditCard} mr={4} fontSize={22} />
            <Text>{taskTitle}</Text>
          </Flex>
          <Flex align="center">
            <Box mr={4} h="20px" w="22px" />
            <Text
              display="inline"
              fontSize="0.875rem"
              fontWeight={400}
              color="gray.600"
            >
              in list {columnTitle}
            </Text>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Grid templateColumns="3fr 1fr" gap={4}>
            <Flex align="center">
              <Box as={FiAlignLeft} mr={4} fontSize={22} />
              <Text fontSize="1rem" fontWeight={500}>
                Description
              </Text>
            </Flex>
            <Textarea
              p={2}
              fontSize="0.875rem"
              ml="37px"
              gridColumn="1 / 2"
              w="93%"
              borderRadius={2}
            />
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

EditTaskModal.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

{
  /* <Popover>
<PopoverTrigger>
  <Link
    fontSize="0.875rem"
    fontWeight={400}
    color="gray.600"
    textDecor="underline"
  >
    {columnTitle}
  </Link>
</PopoverTrigger>
<PopoverContent zIndex={4}>Move list//TODO</PopoverContent>
</Popover> */
}
export default memo(EditTaskModal);
