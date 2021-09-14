import CssBaseline from "@material-ui/core/CssBaseline";
import Minter from "./components/Minter";
import { Browser } from "./components/Browser";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Minter />
      <Browser />
    </>
  );
}
