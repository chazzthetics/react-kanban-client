import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { selectCurrentBoardId } from "../../boards/boardsSlice";
import { columnsSelectors } from "../../columns/columnsSlice";
import { tasksSelectors, reorderTask, reorderBetween } from "../tasksSlice";
import { reorder } from "../../../utils/reorder";
import { Box, Heading, useDisclosure } from "@chakra-ui/core";
import PopoverContainer from "../../../components/PopoverContainer";
import SideModalTrigger from "../../../components/SideModalTrigger";
import SaveButton from "../../../components/SaveButton";
import SelectGrid from "./SelectGrid";

const MoveTaskPopover = ({ taskId, columnId, trigger }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const currentBoardId = useSelector(selectCurrentBoardId);

  const { position } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const { register, handleSubmit, watch } = useForm({
    defaultValues: { board: currentBoardId, list: columnId, position }
  });

  const selectedIds = watch(["board", "list"]);

  const { tasks: startTasks } = useSelector(state =>
    columnsSelectors.selectById(state, columnId)
  );

  const { tasks: endTasks } = useSelector(state =>
    columnsSelectors.selectById(state, selectedIds.list || columnId)
  );

  //FIXME: refactor everything
  const onSubmit = useCallback(
    data => {
      const endIndex = parseInt(data.position);

      // Move task inside same column
      if (columnId === selectedIds.list) {
        const startIndex = startTasks.indexOf(taskId);
        const newOrder = reorder(endTasks, startIndex, endIndex);
        dispatch(reorderTask({ columnId, newOrder: newOrder }));
        onClose();
      }

      // Move task to another column
      if (
        columnId !== selectedIds.list ||
        currentBoardId !== selectedIds.board
      ) {
        const startIndex = startTasks.indexOf(taskId);
        const startOrder = [...startTasks];
        const [removed] = startOrder.splice(startIndex, 1);
        const endOrder = [...endTasks];
        endOrder.splice(endIndex, 0, removed);
        dispatch(
          reorderBetween({
            startColumnId: columnId,
            endColumnId: selectedIds.list,
            startOrder,
            endOrder
          })
        );
      }
    },
    [
      dispatch,
      columnId,
      currentBoardId,
      endTasks,
      selectedIds,
      startTasks,
      taskId,
      onClose
    ]
  );

  return (
    <PopoverContainer
      trigger={
        trigger ? (
          trigger
        ) : (
          <SideModalTrigger icon="arrow-forward" label="Move" />
        )
      }
      heading="Move Card"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box pb={4}>
          <Heading
            as="h4"
            fontSize="0.9rem"
            fontWeight={400}
            pt={3}
            pb={2}
            textTransform="uppercase"
          >
            Select Destination
          </Heading>
          <SelectGrid
            selectedIds={selectedIds}
            columnId={columnId}
            move={true}
            ref={register}
          />
          <SaveButton label="Move" mt={2} px={6} />
        </Box>
      </form>
    </PopoverContainer>
  );
};

MoveTaskPopover.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  trigger: PropTypes.element
};

export default MoveTaskPopover;
