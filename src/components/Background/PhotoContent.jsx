import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPhotos,
  photosSelectors
} from "../../features/photos/photosSlice";
import { Flex, Spinner } from "@chakra-ui/core";
import SearchPhotoForm from "./SearchPhotoForm";
import PhotoBox from "./PhotoBox";

const PhotoContent = () => {
  const dispatch = useDispatch();

  const { status } = useSelector(state => state.photos);
  const photos = useSelector(state => photosSelectors.selectIds(state));
  const count = useSelector(state => photosSelectors.selectTotal(state));

  useEffect(() => {
    const query = "nature";
    if (count === 0) {
      dispatch(fetchPhotos(query));
    }
  }, [dispatch, count]);

  return (
    <>
      <SearchPhotoForm />
      {status === "pending" ? (
        <Flex align="center" justify="center" h="6em">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        <Flex wrap="wrap">
          {photos.map(photo => (
            <PhotoBox key={photo} photoId={photo} />
          ))}
        </Flex>
      )}
    </>
  );
};

export default memo(PhotoContent);
