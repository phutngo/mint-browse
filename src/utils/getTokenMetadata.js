require("dotenv").config();
const key = process.env.REACT_APP_ALCHEMY_KEY
const axios = require("axios");
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE";

export const getTokenMetadata = async () => {
  const url = key;
  const JSONBody={
    "jsonrpc":"2.0",
    "method":"alchemy_getTokenMetadata",
    "params":[contractAddress],
    "id":1
    }
  //making axios POST request to alchemy ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
      },
    })
    .then(function (response) {
      return {
        success: true,
        tokenMetaData: response.data.result,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};
