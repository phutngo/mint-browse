import React from "react";
import { NFTE } from "@nfte/react";
import { Box } from "@material-ui/core";

export const Browser = () => {
  return (
    <>
      <Box style={{ display: "flex", justifyContent: "center" }} m={1}>
        <NFTE contract='0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0' tokenId='18552' />
      </Box>
    </>
  );
};
