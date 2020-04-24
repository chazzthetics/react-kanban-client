import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchPhotos } from "../../features/photos/photosSlice";
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Icon,
  IconButton
} from "@chakra-ui/core";
import SaveButton from "../../components/SaveButton";

const SearchPhotoForm = () => {
  const { register, handleSubmit, getValues } = useForm();
  const value = getValues("query");

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    ({ query }) => {
      dispatch(fetchPhotos(query));
    },
    [dispatch]
  );

  const handleLoadMorePhotos = useCallback(() => {
    if (value.query) {
      dispatch(fetchPhotos(value.query));
    } else {
      dispatch(fetchPhotos("nature"));
    }
  }, [dispatch, value]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup mb={4}>
        <InputLeftElement children={<Icon name="search" color="gray.400" />} />
        <Input
          id="query"
          name="query"
          aria-label="Search photos"
          fontSize="0.875rem"
          size="sm"
          color="gray.700"
          borderRadius={3}
          type="text"
          placeholder="Photos"
          ref={register({ required: true, minLength: 3 })}
        />
        <InputRightElement
          width="7rem"
          display="flex"
          justifyContent="flex-end"
        >
          <SaveButton label="Search" mr={1} color="teal" />
          <IconButton
            aria-label="Refresh"
            type="button"
            icon="repeat"
            size="sm"
            mr={1}
            bg="yellow.400"
            color="white"
            _focus={{ boxShadow: "none" }}
            _hover={{ backgroundColor: "yellow.300" }}
            _active={{ backgroundColor: "yellow.500" }}
            onClick={handleLoadMorePhotos}
          />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default SearchPhotoForm;
