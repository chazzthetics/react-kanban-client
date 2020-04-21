import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  photosSelectors,
  fetchPhotos
} from "../../features/photos/photosSlice";
import {
  selectCurrentBoardId,
  updateBoardBackground
} from "../../features/boards/boardsSlice";
import { Flex, Spinner } from "@chakra-ui/core";
import BackgroundBox from "./BackgroundBox";

const PhotoContent = () => {
  const boardId = useSelector(selectCurrentBoardId);
  const dispatch = useDispatch();

  const { status } = useSelector(state => state.photos);
  const photos = useSelector(state => photosSelectors.selectAll(state));
  const count = useSelector(state => photosSelectors.selectTotal(state));

  const handleUpdateBackground = useCallback(
    background => {
      dispatch(updateBoardBackground({ boardId, background }));
    },
    [dispatch, boardId]
  );

  useEffect(() => {
    const query = "nature";
    if (count === 0) {
      dispatch(fetchPhotos(query));
    }
  }, [dispatch, count]);

  if (status === "idle" || status === "pending") {
    return (
      <Flex align="center" justify="center" h="6em">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <Flex wrap="wrap">
      {photos.map(photo => (
        <BackgroundBox
          key={photo.id}
          image={`url(${photo.src.small})`}
          backroundPosition="center"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          onClick={() => handleUpdateBackground(photo.src.large2x)}
        />
      ))}
    </Flex>
  );
};

export default PhotoContent;
