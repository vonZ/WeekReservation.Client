import React from "react";
import PropTypes from "prop-types";
import "./loading-wrapper.scss";

const LoadingWrapper = ({ children, isActive = false }) => {
  return (
    <div className={isActive ? "overlay-wrapper--inactive" : "overlay-wrapper"}>
      {children}
    </div>
  );
};

LoadingWrapper.propTypes = {
  children: PropTypes.any,
  isActive: PropTypes.bool
};

export default LoadingWrapper;
