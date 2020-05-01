import React, { useEffect, useCallback } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { login, authenticate } from "../features/auth/authSlice";
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
  const { status, access_token, error, user, isAuthenticated } = useSelector(
    state => state.auth
  );

  const location = useLocation();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "jdoe@test.com",
      password: "password"
    }
  });

  const onSubmit = useCallback(
    data => {
      const credentials = { email: data.email, password: data.password };
      dispatch(login(credentials));
    },
    [dispatch]
  );

  useEffect(() => {
    if (status === "idle" && access_token) {
      dispatch(authenticate(access_token));
    }
  }, [dispatch, status, access_token]);

  if (isAuthenticated && location.state && location.state.from.pathname) {
    return <Redirect push={true} to={location.state.from.pathname} />;
  }

  if (isAuthenticated) {
    return <Redirect push={true} to={dashboard(user)} />;
  }

  return (
    <Box bg="gray.200" h="100vh">
      <Flex px={16} flexDir="column" justify="center" align="center" h="80vh">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
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
                autoComplete="username"
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
                autoComplete="current-password"
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
                loadingText="Logging in..."
                mb={2}
              >
                Login
              </Button>
              <Box>
                <Box fontSize="xs" color="red.400" textAlign="center">
                  {error?.message && "Invalid Credentials"}
                </Box>
              </Box>
            </Box>
          </Stack>
        </form>
      </Flex>
    </Box>
  );
};

export default LoginPage;
