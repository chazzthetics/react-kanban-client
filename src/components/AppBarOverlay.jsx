import React from "react";

const AppBarOverlay = () => {
  return (
    <div
      className="overlay"
      style={{
        width: "100vw",
        height: "2.5rem",
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.2)"
      }}
    />
  );
};

export default AppBarOverlay;
