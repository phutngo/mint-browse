import React from "react";

import { NFTE } from "@nfte/react";
import { Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";

import { getTokenMetadata } from "../utils/getTokenMetadata";

export const Browser = () => {
  const [tokenMetaData, setTokenMetaData] = useState("");

  useEffect(() => {
    async function getAsync() {
      const tokenMetaData = await getTokenMetadata();
      setTokenMetaData(tokenMetaData);
    }
    getAsync();
  }, []);

  return (
    <>
      <Paper>
        <Box style={{ display: "flex", justifyContent: "center" }} m={1}>
          {tokenMetaData.success ? (
            <Typography variant='h6'>
              NFT's minted from: {tokenMetaData.tokenMetaData.name}
              {" ("}
              {tokenMetaData.tokenMetaData.symbol}
              {")"}
            </Typography>
          ) : null}
        </Box>
        <Box style={{ display: "flex", justifyContent: "center" }} m={1}>
          <NFTE contract='0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D' tokenId='140' />
        </Box>
      </Paper>
    </>
  );
};
