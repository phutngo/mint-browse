import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, mintNFT } from "./utils/interact";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Minter = (props) => {
  const classes = useStyles();

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

  //wallet listener so our UI updates when our wallet's state changes, such as when the user disconnects or switches accounts.
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target='_blank' rel='noreferrer' href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your browser.
          </a>
        </p>
      );
    }
  }

  //get the account if it's already previously connected
  useEffect(() => {
    async function getAsync() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
    }
    getAsync();
    addWalletListener();
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { status } = await mintNFT(url, name, description);
    setStatus(status);
  };

  return (
    <>
      <Grid container direction='column' justifyContent='flex-start' alignItems='center' spacing='3'>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Button variant='outlined' id='walletButton' onClick={connectWalletPressed}>
              {walletAddress.length > 0 ? (
                "Connected to MetaMask Account: " + String(walletAddress)
              ) : (
                <span>Connect To Your Meta Mask Account</span>
              )}
            </Button>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <form>
              <h2>🖼 Link to asset: </h2>
              <input
                type='text'
                placeholder='e.g. https://gateway.pinata.cloud/ipfs/<hash>'
                onChange={(event) => setURL(event.target.value)}
              />
              <h2>🤔 Name: </h2>
              <input type='text' placeholder='e.g. My first NFT!' onChange={(event) => setName(event.target.value)} />
              <h2>✍️ Description: </h2>
              <input
                type='text'
                placeholder='e.g. Even cooler than cryptokitties ;)'
                onChange={(event) => setDescription(event.target.value)}
              />
            </form>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            {" "}
            <button id='mintButton' onClick={onMintPressed}>
              Mint NFT
            </button>
            <p id='status'>{status}</p>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Minter;
