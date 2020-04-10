export const handleError = (error, restore, prevState) => dispatch => {
  dispatch(
    restore({
      ...prevState,
      status: "error",
      error: error.response.data.message || "Something went wrong..."
    })
  );
};
