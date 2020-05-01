import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { FormControl, FormLabel, Input } from "@chakra-ui/core";
import { FiCheckSquare } from "react-icons/fi";
import PopoverContainer from "../../../components/PopoverContainer";
import SideModalTrigger from "../../../components/SideModalTrigger";
import SaveButton from "../../../components/SaveButton";

const ChecklistPopover = ({ taskId, trigger }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { title: "Checklist" }
  });

  const onSubmit = useCallback(data => {
    console.log(data);
  }, []);

  const initialFocusRef = useRef(null);

  return (
    <PopoverContainer
      trigger={
        trigger ? (
          trigger
        ) : (
          <SideModalTrigger icon={FiCheckSquare} label="Checklist" />
        )
      }
      heading="Add Checklist"
      initialFocusRef={initialFocusRef}
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

export default ChecklistPopover;
