import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addChecklist, tasksSelectors } from "../tasksSlice";
import { makeChecklist } from "../../../utils/makeEntity";
import { FiCheckSquare } from "react-icons/fi";
import { FormControl, FormLabel, Input, useDisclosure } from "@chakra-ui/core";
import PopoverContainer from "../../../components/PopoverContainer";
import SideModalTrigger from "../../../components/SideModalTrigger";
import SaveButton from "../../../components/SaveButton";

const ChecklistPopover = ({ taskId, trigger }) => {
  const initialFocusRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit } = useForm({
    defaultValues: { title: "Checklist" }
  });

  const { checklist } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    data => {
      const checklist = makeChecklist(data.title);
      dispatch(addChecklist({ taskId, checklist }));
      onClose();
    },
    [dispatch, taskId, onClose]
  );

  return (
    <PopoverContainer
      trigger={
        trigger ? (
          trigger
        ) : (
          <SideModalTrigger
            icon={FiCheckSquare}
            label="Checklist"
            disabled={checklist}
          />
        )
      }
      heading="Add Checklist"
      initialFocusRef={initialFocusRef}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={2}>
          <FormLabel htmlFor="title" fontSize="0.8rem" color="gray.600">
            Title
          </FormLabel>
          <Input
            name="title"
            id="title"
            size="sm"
            fontSize="0.875rem"
            ref={e => {
              initialFocusRef.current = e;
              register(e, { required: true, maxLength: 50 });
            }}
          />
        </FormControl>
        <SaveButton label="Add" px={6} />
      </form>
    </PopoverContainer>
  );
};

ChecklistPopover.propTypes = {
  taskId: PropTypes.string.isRequired,
  trigger: PropTypes.element
};

export default ChecklistPopover;
