import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { addDueDate, removeDueDate, tasksSelectors } from "../tasksSlice";
import { toDate, addHours } from "date-fns";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  useDisclosure
} from "@chakra-ui/core";
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
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <SideModalTrigger icon="time" label="Due Date" />
      </PopoverTrigger>
      <PopoverContent
        w="18rem"
        zIndex={4}
        _focus={{ boxShadow: "none", outline: "none" }}
      >
        <PopoverHeader textAlign="center" fontSize="0.9rem" opacity={0.8}>
          Change Due Date
        </PopoverHeader>
        <PopoverCloseButton
          opacity={0.6}
          _hover={{ opacity: 1 }}
          _active={{ boxShadow: "none" }}
        />
        <form onSubmit={handleSubmit}>
          <PopoverBody>
            <DayPicker selectedDays={selectedDay} onDayClick={handleDayClick} />
          </PopoverBody>
          <PopoverFooter
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <SaveButton />
            <RemoveButton onClick={handleRemoveDueDate} />
          </PopoverFooter>
        </form>
      </PopoverContent>
    </Popover>
  );
};

DueDatePopover.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default DueDatePopover;
