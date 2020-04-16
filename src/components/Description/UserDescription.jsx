import React from "react";
import { useSelector } from "react-redux";
import { Flex, Text, Link } from "@chakra-ui/core";
import UserAvatar from "../../features/auth/components/UserAvatar";

const UserDescription = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <Flex px={2} pt={2} pb={6} align="center">
      <UserAvatar size="md" fontSize="1rem" mr={2} />
      <Flex direction="column">
        <Text fontSize="1rem" fontWeight={600} color="gray.800">
          {user.name}
        </Text>
        <Text fontSize="0.875rem" color="gray.500">
          @jdoe660
        </Text>
        <Link fontSize="0.875rem" color="gray.600" textDecor="underline">
          Edit profile info
        </Link>
      </Flex>
    </Flex>
  );
};

export default UserDescription;
