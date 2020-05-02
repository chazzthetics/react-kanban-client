import React, { memo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentBoard,
  selectBackgroundIsImage,
  removeBoard
} from "../boardsSlice";
import { dashboard } from "../../../utils/getPath";
import { Flex, Text } from "@chakra-ui/core";
import IconButton from "../../../components/IconButton";
import PopoverContainer from "../../../components/PopoverContainer";
import RemoveButton from "../../../components/RemoveButton";

const RemoveBoardButton = () => {
  const { user } = useSelector(state => state.auth);
  const board = useSelector(selectCurrentBoard);
  const isImage = useSelector(selectBackgroundIsImage);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleRemoveBoard = useCallback(() => {
    dispatch(removeBoard(board.uuid));
    history.replace(dashboard(user));
  }, [dispatch, board, history, user]);

  return (
    <PopoverContainer
      trigger={
        <IconButton
          icon="delete"
          label="Delete Board"
          isImage={isImage}
          mr={1}
        />
      }
      heading="Remove Board?"
    >
      <Flex flexDir="column" align="stretch" justify="space-between">
        <Text fontSize="0.875rem" color="gray.600" mb={2}>
          Are you sure you want to remove this board? This action is permanent.
        </Text>
        <RemoveButton onClick={handleRemoveBoard} />
      </Flex>
    </PopoverContainer>
  );
};

export default memo(RemoveBoardButton);
