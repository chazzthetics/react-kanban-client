import React, { useEffect, useState, useCallback, memo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { addDueDate, removeDueDate, tasksSelectors } from "../tasksSlice";
import { toDate, addHours } from "date-fns";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { Flex, useDisclosure } from "@chakra-ui/core";
import PopoverContainer from "../../../components/PopoverContainer";
import SaveButton from "../../../components/SaveButton";
import RemoveButton from "../../../components/RemoveButton";
import SideModalTrigger from "../../../components/SideModalTrigger";

const DueDatePopover = ({ taskId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const { due_date } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (day, { selected }) => {
    setSelectedDay(selected ? undefined : day);
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (selectedDay) {
        dispatch(addDueDate({ taskId, due_date: selectedDay }));
        onClose();
      }
    },
    [dispatch, selectedDay, taskId, onClose]
  );

  const handleRemoveDueDate = useCallback(() => {
    dispatch(removeDueDate({ taskId }));
    onClose();
  }, [dispatch, taskId, onClose]);

  useEffect(() => {
    if (due_date) {
      const date = toDate(addHours(new Date(due_date), 4));
      setSelectedDay(date);
    }
  }, [due_date]);

  return (
    <PopoverContainer
      trigger={<SideModalTrigger icon="time" label="Due Date" />}
      heading="Change Due Date"
      footer={
        <Flex justify="space-between" align="center">
          <SaveButton form="dueDate" />
          <RemoveButton onClick={handleRemoveDueDate} />
        </Flex>
      }
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} id="dueDate">
        <DayPicker selectedDays={selectedDay} onDayClick={handleDayClick} />
      </form>
    </PopoverContainer>
  );
};

DueDatePopover.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default DueDatePopover;
