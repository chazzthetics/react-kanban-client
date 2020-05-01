import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentBoard,
  selectBackgroundIsImage,
  removeBoard
} from "../boardsSlice";
import { dashboard } from "../../../utils/getPath";
import IconButton from "../../../components/IconButton";

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
    <IconButton
      icon="delete"
      label="Delete Board"
      onClick={handleRemoveBoard}
      isImage={isImage}
      mr={1}
    />
  );
};

export default React.memo(RemoveBoardButton);
