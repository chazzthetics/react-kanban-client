import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { selectCurrentBoardId } from "../../boards/boardsSlice";
import { tasksSelectors, copyTask, quickEditClosed } from "../tasksSlice";
import { copyTask as copyTaskEntity } from "../../../utils/makeEntity";
import { FormControl, FormLabel, Input, useDisclosure } from "@chakra-ui/core";
import PopoverContainer from "../../../components/PopoverContainer";
import SideModalTrigger from "../../../components/SideModalTrigger";
import SaveButton from "../../../components/SaveButton";
import SelectGrid from "./SelectGrid";

const CopyTaskPopover = ({ taskId, columnId, trigger }) => {
  const initialFocusRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    onClose();
    dispatch(quickEditClosed({ taskId }));
  }, [dispatch, taskId, onClose]);

  const task = useSelector(state => tasksSelectors.selectById(state, taskId));
  const currentBoardId = useSelector(selectCurrentBoardId);

  const { position } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      title: task.title,
      board: currentBoardId,
      list: columnId,
      position
    }
  });

  const selectedIds = watch(["board", "list"]);

  const onSubmit = useCallback(
    data => {
      const copiedTask = copyTaskEntity(task, {
        title: data.title,
        position: parseInt(data.position)
      });

      dispatch(
        copyTask({ taskId, columnId: selectedIds.list, task: copiedTask })
      );
      handleClose();
    },
    [dispatch, taskId, task, selectedIds.list, handleClose]
  );

  return (
    <PopoverContainer
      heading="Copy Card"
      trigger={
        trigger ? trigger : <SideModalTrigger icon="copy" label="Copy" />
      }
      initialFocusRef={initialFocusRef}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={3}>
          <FormLabel htmlFor="title" fontSize="0.8rem" opacity={0.8}>
            Title
          </FormLabel>
          <Input
            name="title"
            aria-label="title"
            id="title"
            type="text"
            size="sm"
            autoComplete="off"
            ref={e => {
              register(e, { required: true });
              initialFocusRef.current = e;
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="copy to" fontSize="0.8rem" opacity={0.8}>
            Copy to...
          </FormLabel>
        </FormControl>
        <SelectGrid
          selectedIds={selectedIds}
          columnId={columnId}
          copy={true}
          ref={register}
        />
        <SaveButton label="Create Card" my={2} px={6} />
      </form>
    </PopoverContainer>
  );
};

CopyTaskPopover.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  trigger: PropTypes.element
};

export default CopyTaskPopover;
