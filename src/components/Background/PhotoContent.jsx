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
import { Flex, Link, Spinner } from "@chakra-ui/core";
import BackgroundBox from "./BackgroundBox";
import SearchPhotoForm from "./SearchPhotoForm";

//FIXME: show credits only on hover
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
            <BackgroundBox
              key={photo.id}
              image={`url(${photo.src.small})`}
              backroundPosition="center"
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              position="relative"
              onClick={() => handleUpdateBackground(photo.src.large2x)}
            >
              <Flex
                position="absolute"
                bottom={0}
                bg="rgba(0,0,0,0.3)"
                w="100%"
                h="1.5rem"
                borderBottomLeftRadius={4}
                borderBottomRightRadius={4}
                align="center"
              >
                <Link
                  fontSize="0.7rem"
                  ml={2}
                  alignSelf="center"
                  color="white"
                  href={photo.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Photo provided by Pexels"
                  _focus={{ outline: "none" }}
                  isTruncated={true}
                >
                  {photo.photographer}
                </Link>
              </Flex>
            </BackgroundBox>
          ))}
        </Flex>
      )}
    </>
  );
};

export default PhotoContent;
