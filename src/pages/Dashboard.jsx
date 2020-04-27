import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hydrate } from "../features/auth/authSlice";
import { boardsSelectors, changeBoard } from "../features/boards/boardsSlice";

import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  const boards = useSelector(state => boardsSelectors.selectAll(state));

  useEffect(() => {
    if (isAuthenticated && boards.length === 0) {
      dispatch(hydrate());
    }
  }, [dispatch, isAuthenticated, boards]);

  const handleChangeBoard = React.useCallback(
    id => {
      dispatch(changeBoard(id));
    },
    [dispatch]
  );

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {boards.map(board => (
          <Link
            key={board.uuid}
            to={`/b/${board.uuid}/${board.slug}`}
            onClick={() => handleChangeBoard(board.uuid)}
          >
            {board.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
