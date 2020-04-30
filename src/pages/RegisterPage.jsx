import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { login, register as registerUser } from "../features/auth/authSlice";
import { dashboard } from "../utils/getPath";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack
} from "@chakra-ui/core";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, error, user } = useSelector(state => state.auth);

  const history = useHistory();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "Jane Kim",
      email: "jkim@test.com",
      password: "password"
    }
  });

  const onSubmit = useCallback(
    data => {
      const credentials = {
        name: data.name,
        email: data.email,
        password: data.password
      };
      dispatch(registerUser(credentials));
    },
    [dispatch]
  );

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      dispatch(login());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      history.replace(dashboard(user));
    }
  }, [user, history]);

  return (
    <Box bg="gray.200" h="100vh">
      <Flex px={16} flexDir="column" justify="center" align="center" h="80vh">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel htmlFor="name" fontSize="0.875rem">
                Name
              </FormLabel>
              <Input
                type="text"
                id="name"
                size="sm"
                name="name"
                ref={register({ required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email" fontSize="0.875rem">
                Email Address
              </FormLabel>
              <Input
                type="email"
                id="email"
                size="sm"
                name="email"
                ref={register({ required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email" fontSize="0.875rem">
                Password
              </FormLabel>
              <Input
                type="password"
                id="password"
                size="sm"
                name="password"
                ref={register({ required: true })}
              />
            </FormControl>
            <Box>
              <Button
                type="submit"
                size="sm"
                variantColor="green"
                display="block"
                w="100%"
                isLoading={status === "pending"}
                loadingText="Registering..."
                mb={2}
              >
                Register
              </Button>
            </Box>
          </Stack>
        </form>
      </Flex>
    </Box>
  );
};

export default LoginPage;