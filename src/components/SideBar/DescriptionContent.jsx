import React from "react";
import PropTypes from "prop-types";
import { Flex, Text, Box, Heading, Textarea } from "@chakra-ui/core";
import { FiUser, FiAlignLeft } from "react-icons/fi";
import UserAvatar from "../../features/auth/components/UserAvatar";
import SaveButton from "../SaveButton";

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
      <Box px={3} pt={3} pb={6}>
        <form>
          <Textarea
            fontSize="0.875rem"
            bg="gray.50"
            px={2}
            mb={2}
            borderRadius={2}
            resize="none"
            placeholder="It's your board's time to shine! Let people know what this board is used for and what they can expect to see."
          />
          <SaveButton />
        </form>
      </Box>
    </>
  );
};

export default DescriptionContent;
