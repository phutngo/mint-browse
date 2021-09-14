import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, mintNFT } from "./utils/interact";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "60ch",
    },
  },
  field: {
    backgroundColor: "",
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
          setStatus("🦊 Connect to Metamask using the button on top of page.");
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
            <Button variant='outlined' id='walletButton' color='primary' onClick={connectWalletPressed}>
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
            <form className={classes.form} noValidate autoComplete='on'>
              <TextField
                id='asset-link'
                label='Link to Asset / Image'
                variant='outlined'
                type='text'
                placeholder='e.g. https://gateway.pinata.cloud/ipfs/<hash>'
                onChange={(event) => setURL(event.target.value)}
              />

              <TextField
                id='token-name'
                label='Name of NFT'
                variant='outlined'
                type='text'
                placeholder='e.g. My best NFT!'
                onChange={(event) => setName(event.target.value)}
              />

              <TextField
                id='token-description'
                label='Description of NFT'
                variant='outlined'
                type='text'
                placeholder='e.g. More 🟩shapes🟣 than BAYC 😊'
                onChange={(event) => setDescription(event.target.value)}
              />

              <Button variant='contained' color='primary' id='mintButton' onClick={onMintPressed}>
                Mint NFT
              </Button>

              <Typography>{status}</Typography>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Minter;
