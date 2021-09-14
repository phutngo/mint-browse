import { ethers } from "ethers";
require('dotenv').config()

const { REACT_APP_ETHERSCAN_API, REACT_APP_INFURA_PROJECT_ID } = process.env;

export const getNfts = async (contractAddress, contractABI) => {
  //https://docs.ethers.io/v5/api-keys/
  const network = "rinkeby";
  // Specify your own API keys. Each is optional, and if you omit it the default API key for that service will be used.
  const providerOptions = {
    etherscan: REACT_APP_ETHERSCAN_API,
    infura: REACT_APP_INFURA_PROJECT_ID,
    //Or if using a project secret:
    // infura: {
    //   projectId: REACT_APP_INFURA_PROJECT_ID,
    //   projectSecret: REACT_APP_INFURA_PROJECT_SECRET,
    // },
    //alchemy: REACT_APP_RINKEBY_ALCHEMY_URL,
  };
  const provider = new ethers.getDefaultProvider(network, providerOptions);
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  //Todo update signed in address to be  to display tokens of signed in user
  //const signedInAddress = "0x9a58d7376e21a561904D68FAC239Eaaf2915437A"
  try {
    let data = {};
    data.owner = await contract.owner(); //owner/deployer of smartcontract
    data.symbol = await contract.symbol(); //symbol of smartcontract
    //data.paused = await contract.paused(); //
    //data.totalSupply = await contract.totalSupply(); //how many has been minted
    //data.walletOfOwner = await contract.walletOfOwner(signedInAddress) //returns
    data.ownerOf = await contract.ownerOf(1); //owner of tokenId
    data.tokenURI = await contract.tokenURI(1); //the URI for the token#!!

    return data;
  } catch (err) {
    //console.log("Error: ", err);
    return err;
  }
};
