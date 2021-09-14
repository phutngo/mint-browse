import React from "react";

import { Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";

import { contractAddress } from "../utils/CONSTANTS";
import { getTokenMetadata } from "../utils/getTokenMetadata";

export const Browser = () => {
  const [tokenMetaData, setTokenMetaData] = useState("");

  useEffect(() => {
    async function getAsync() {
      const tokenMetaData = await getTokenMetadata(contractAddress);
      setTokenMetaData(tokenMetaData);
    }
    getAsync();
  }, []);

  return (
    <>
      <Paper>
        <Box style={{ textAlign: "center" }} m={1}>
          {tokenMetaData.success ? (
            <>
              <Typography variant='h6'>
                NFT's minted from: {tokenMetaData.tokenMetaData.name}
                {" ("}
                {tokenMetaData.tokenMetaData.symbol}
                {")"}
              </Typography>
              <Typography variant='body2'> {contractAddress} </Typography>
            </>
          ) : null}
        </Box>
     
      </Paper>
    </>
  );
};
