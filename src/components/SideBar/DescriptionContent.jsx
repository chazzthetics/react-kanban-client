import React from "react";
import PropTypes from "prop-types";
import { Flex, Text, Box, Heading, Textarea } from "@chakra-ui/core";
import { FiUser, FiAlignLeft } from "react-icons/fi";
import UserAvatar from "../../features/auth/components/UserAvatar";
import SaveButton from "../SaveButton";
import { Editable, EditablePreview, EditableInput } from "@chakra-ui/core";

const ContentHeading = ({ icon, heading }) => {
  return (
    <Flex align="center" px={3} py={1}>
      <Box as={icon} size="1.6rem" mr={2} color="gray.800" />
      <Heading as="h4" fontSize="1rem" color="gray.800" fontWeight={600}>
        {heading}
      </Heading>
    </Flex>
  );
};

ContentHeading.propTypes = {
  icon: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired
};

//FIXME:  finish
const DescriptionContent = () => {
  return (
    <>
      <ContentHeading icon={FiUser} heading="Made by" />
      <Flex px={2} pt={2} pb={6} align="center">
        <UserAvatar size="md" fontSize="1rem" mr={2} />
        <Flex direction="column">
          <Text fontSize="1rem" fontWeight={600} color="gray.800">
            John Doe
          </Text>
          <Text fontSize="0.875rem" color="gray.500">
            @jdoe660
          </Text>
          <Text fontSize="0.875rem" color="gray.600" textDecor="underline">
            Edit profile info
          </Text>
        </Flex>
      </Flex>

      <ContentHeading icon={FiAlignLeft} heading="Description" />
      <Box px={4} pt={3} pb={6}>
        <Editable placeholder="It's your board's time to shine! Let people know what this board is used for and what they can expect to see.">
          <EditablePreview
            fontSize="0.875rem"
            bg="hsla(0,0%,0%,0.075)"
            px={2}
            pt={2}
            pb={6}
            mb={1}
            borderRadius={2}
            minH="76px"
            cursor="pointer"
            _placeholder={{ color: "gray.600" }}
          />
          <EditableInput
            as="textarea"
            fontSize="0.875rem"
            bg="white"
            px={2}
            py={2}
            borderRadius={2}
            resize="none"
            minH="108px"
            h="108px"
            color="gray.900"
            _focus={{
              boxShadow: "inset 0 0 0 2px #0079bf",
              borderRadius: "4px",
              border: "none"
            }}
            _placeholder={{ color: "gray.600" }}
          />
          <SaveButton />
        </Editable>
      </Box>
    </>
  );
};

export default DescriptionContent;
