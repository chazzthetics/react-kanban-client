import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { createBoard } from "../boardsSlice";
import { makeBoard } from "../../../utils/makeEntity";
import { board as boardPath } from "../../../utils/getPath";
import { backgroundColors } from "../../../utils/backgroundColors";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  PopoverFooter,
  RadioButtonGroup
} from "@chakra-ui/core";
import ColorRadioButton from "./ColorRadioButton";
import SaveButton from "../../../components/SaveButton";

const CreateBoardForm = ({ closeOnSubmit, firstFieldRef }) => {
  const { register, handleSubmit, reset, formState, control } = useForm({
    mode: "onChange"
  });

  const { isValid } = formState;

  const history = useHistory();

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    ({ title, background }) => {
      const board = makeBoard(title, background);
      dispatch(createBoard(board));
      reset();
      closeOnSubmit();
      history.replace(boardPath(board));
    },
    [dispatch, reset, closeOnSubmit, history]
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
          <Controller
            as={
              <RadioButtonGroup id="background" isInline>
                {backgroundColors.map(color => (
                  <ColorRadioButton key={color} value={color} />
                ))}
              </RadioButtonGroup>
            }
            control={control}
            rules={{ required: true }}
            name="background"
          />
        </FormControl>
        <PopoverFooter px={0}>
          <SaveButton label="Create Board" disabled={!isValid} />
        </PopoverFooter>
      </Stack>
    </form>
  );
};

CreateBoardForm.propTypes = {
  closeOnSubmit: PropTypes.func.isRequired
};

export default CreateBoardForm;
