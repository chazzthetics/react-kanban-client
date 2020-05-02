import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeChecklist } from "../tasksSlice";
import LightButton from "../../../components/LightButton";

const RemoveChecklistButton = ({ taskId }) => {
  const dispatch = useDispatch();

  const handleRemoveChecklist = useCallback(() => {
    dispatch(removeChecklist({ taskId }));
  }, [dispatch, taskId]);

  return <LightButton label="Delete" onClick={handleRemoveChecklist} />;
};

RemoveChecklistButton.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default RemoveChecklistButton;
