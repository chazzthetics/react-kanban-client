import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createBoard } from "../boardsSlice";
import { makeBoard } from "../../../utils/makeEntity";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  PopoverFooter
} from "@chakra-ui/core";

const CreateBoardForm = ({ closeOnSubmit, firstFieldRef }) => {
  const { register, handleSubmit, reset, formState } = useForm({
    mode: "onChange"
  });

  const { isValid } = formState;

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    ({ title }) => {
      const board = makeBoard(title, "green");
      dispatch(createBoard(board));
      reset();
      closeOnSubmit();
    },
    [dispatch, reset, closeOnSubmit]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel htmlFor="title" fontSize="0.9rem" opacity={0.8}>
            Board Title
          </FormLabel>
          <Input
            id="title"
            type="text"
            name="title"
            size="sm"
            placeholder="Enter a title..."
            autoComplete="off"
            ref={e => {
              register(e, { required: true, maxLength: 30 });
              firstFieldRef.current = e;
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="background" fontSize="0.9rem" opacity={0.8}>
            Choose a Background
          </FormLabel>
          <Input
            id="background"
            name="background"
            size="sm"
            ref={register}
            disabled
          />
        </FormControl>
        <PopoverFooter px={0}>
          <Button
            type="submit"
            size="sm"
            color="white"
            bg="green.400"
            fontWeight="normal"
            _hover={{ backgroundColor: "green.500" }}
            _active={{ backgroundColor: "green.500", boxShadow: "none" }}
            _focus={{ boxShadow: "none" }}
            _disabled={{
              backgroundColor: "gray.200",
              color: "gray.500",
              cursor: "not-allowed"
            }}
            disabled={!isValid}
          >
            Create Board
          </Button>
        </PopoverFooter>
      </Stack>
    </form>
  );
};

CreateBoardForm.propTypes = {
  closeOnSubmit: PropTypes.func.isRequired
};

export default CreateBoardForm;
