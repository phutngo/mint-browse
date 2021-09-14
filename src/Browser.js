import React from "react";
import { NFTE } from "@nfte/react";
import { Box, Paper } from "@material-ui/core";



export const Browser = () => {
  return (
    <>
      <Box>
        <Paper>
          <NFTE contract='0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0' tokenId='18552' />
        </Paper>
      </Box>
    </>
  );
};
