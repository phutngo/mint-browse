import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";

import { contractAddress, contractABI } from "../utils/CONSTANTS";
import { useTokens } from "../utils/useTokens";

export const NftCard = () => {
  const { isLoading, error, data: tokensData } = useTokens(contractAddress, contractABI);

  return (
    <>
      <Paper>
        <Box>
          <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
            {tokensData &&
              tokensData.map((token, index) => {
                return (
                  <div key={token.tokenId.toString()}>
                    <Typography>
                      {token.tokenId} {token.tokenURI}{" "}
                    </Typography>
                  </div>
                );
              })}
          </Grid>
        </Box>
      </Paper>
    </>
  );
};
