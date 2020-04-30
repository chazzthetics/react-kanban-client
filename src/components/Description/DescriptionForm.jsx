import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Textarea } from "@chakra-ui/core";
import SaveButtonGroup from "../SaveButtonGroup";

//TODO: finish styles, generate random quote
const quote =
  "Yesterday is not ours to recover, but tomorrow is ours to win or lose.";

const DescriptionForm = ({
  isOpen,
  onOpen,
  onClose,
  onSubmit,
  description = "",
  ...rest
}) => {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (description) {
      setValue("description", description);
    } else {
      setValue("description", "");
    }
  }, [description, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Textarea
        onFocus={onOpen}
        name="description"
        size="sm"
        resize="none"
        px={2}
        mb={2}
        w="100%"
        bg={description ? "inherit" : "rgba(9,30,66,.04)"}
        border="none"
        _hover={{ backgroundColor: "hsla(0,0%,0%,0.075)" }}
        _focus={{
          backgroundColor: "white",
          boxShadow: "0 0 0 2px #3182ce",
          borderRadius: 1
        }}
        borderRadius={2}
        fontSize="0.875rem"
        color="gray.800"
        h="6rem"
        cursor="pointer"
        placeholder={quote}
        ref={register}
        wordBreak="break-word"
        {...rest}
      />
      {isOpen && <SaveButtonGroup onClose={onClose} {...rest} />}
    </form>
  );
};

DescriptionForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  description: PropTypes.string
};

export default DescriptionForm;
