import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { addDueDate, removeDueDate, tasksSelectors } from "../tasksSlice";
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
  Button
} from "@chakra-ui/core";
import SaveButton from "../../../components/SaveButton";
import { toDate } from "date-fns";

const DueDatePopover = ({ taskId }) => {
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
      }
    },
    [dispatch, selectedDay, taskId]
  );

  const handleRemoveDueDate = useCallback(() => {
    if (due_date) {
      dispatch(removeDueDate({ taskId }));
    }
  }, [dispatch, due_date, taskId]);

  useEffect(() => {
    if (due_date) {
      const date = toDate(new Date(due_date));
      setSelectedDay(date);
    }
  }, [due_date]);

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          size="sm"
          leftIcon="time"
          fontWeight={400}
          w="12rem"
          justifyContent="flex-start"
          backgroundColor="#ebecf0"
          _focus={{ boxShadow: "none" }}
        >
          Due Date
        </Button>
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
            <Button
              type="button"
              size="sm"
              color="white"
              bg="red.300"
              fontWeight="normal"
              _hover={{ backgroundColor: "red.400" }}
              _active={{ backgroundColor: "red.500", boxShadow: "none" }}
              _focus={{ boxShadow: "none" }}
              onClick={handleRemoveDueDate}
            >
              Remove
            </Button>
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
