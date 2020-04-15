import React from "react";
import { Box, Flex, Button } from "@chakra-ui/core";

const ActivityButton = ({ label, isSelected, onSelect }) => {
  return (
    <Button
      w="47%"
      d="inline-block"
      size="sm"
      fontWeight="400"
      bg={isSelected ? "blue.500" : "transparent"}
      color={isSelected ? "white" : "gray.900"}
      textDecor={isSelected ? "none" : "underline"}
      mx={1}
      _hover={{
        backgroundColor: "blue.400",
        color: "white",
        textDecoration: "none"
      }}
      _active={{
        backgroundColor: "blue.600",
        color: "white",
        textDecoration: "none",
        boxShadow: "none"
      }}
      _focus={{
        backgroundColor: "blue.500",
        color: "white",
        textDecoration: "none",
        boxShadow: "none"
      }}
      transition="all 120ms ease-in"
      onClick={onSelect}
    >
      {label}
    </Button>
  );
};

const ActivityContent = () => {
  const [isSelected, setIsSelected] = React.useState(true);

  const handleSelect = () => {
    setIsSelected(isSelected => !isSelected);
  };

  return (
    <>
      <ActivityButton
        label="All"
        isSelected={isSelected}
        onSelect={handleSelect}
      />
      <ActivityButton
        label="Comments"
        isSelected={!isSelected}
        onSelect={handleSelect}
      />
    </>
  );
};

export default ActivityContent;
