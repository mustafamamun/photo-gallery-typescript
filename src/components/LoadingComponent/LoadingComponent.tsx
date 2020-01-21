import React from "react";
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/core";

const LoadingComponent: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const override = css`
    display: block;
    margin: 0 auto;
  `;
  return (
    <DotLoader
      color={"#123abc"}
      loading={isLoading}
      css={override}
      size={150}
    />
  );
};

export default LoadingComponent;
