import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useFocus } from "../../../hooks/useFocus";
import { useClickOutside } from "../../../hooks/useClickOutside";
import {
  selectBoardColumnCount,
  selectCurrentBoardId
} from "../../boards/boardsSlice";
import { createColumn } from "../columnsSlice";
import { makeColumn } from "../../../utils/makeEntity";
import { Box, Input, useDisclosure } from "@chakra-ui/core";
import CreateColumnButton from "./CreateColumnButton";
import SaveButtonGroup from "../../../components/SaveButtonGroup";

const CreateColumnForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();
  const focusRef = useFocus();
  const dispatch = useDispatch();
  const position = useSelector(selectBoardColumnCount);
  const currentBoardId = useSelector(selectCurrentBoardId);

  const onSubmit = useCallback(
    ({ columnTitle }) => {
      const column = makeColumn(columnTitle, position);
      dispatch(createColumn({ column, boardId: currentBoardId }));
      reset();
    },
    [dispatch, reset, position, currentBoardId]
  );

  const container = useClickOutside(
    onClose,
    {
      close: {
        click: true,
        esc: true,
        enter: false
      }
    },
    handleSubmit(onSubmit)
  );

  return (
    <Box className="ColumnForm" minW="17rem" w="17rem" h="100%">
      {!isOpen ? (
        <CreateColumnButton onShow={onOpen} />
      ) : (
        <Box bg="#ebecf0" p="6px" borderRadius={3} ref={container}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="Enter list title..."
              name="columnTitle"
              ref={e => {
                register(e, { required: true });
                focusRef.current = e;
              }}
              width="100%"
              fontSize="0.875rem"
              borderRadius={3}
              h="2rem"
              py={1}
              px={2}
              mb="6px"
              autoComplete="off"
              autoFocus
            />
            <SaveButtonGroup label="Add List" onClose={onClose} />
          </form>
        </Box>
      )}
    </Box>
  );
};

export default CreateColumnForm;
