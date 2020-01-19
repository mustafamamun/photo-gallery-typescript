import React, { useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import { Container } from "react-bootstrap";
import { css } from "@emotion/core";
import { ApplicationContextProvider } from "../context/ApplicationContext";
import Routes from "../routes";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: green;
    margin-top: ${window.innerHeight / 3}px;
  `;
  return (
    <ApplicationContextProvider value={{ isLoading, setIsLoading }}>
      <DotLoader
        color={"#123abc"}
        loading={isLoading}
        css={override}
        size={150}
      />
      <Container>
        <Routes />
      </Container>
    </ApplicationContextProvider>
  );
};

export default App;
