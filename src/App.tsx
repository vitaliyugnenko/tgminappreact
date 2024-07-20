import { TonConnectButton } from "@tonconnect/ui-react";
import "./App.css";
import { AddressInfo } from "./AddressInfo";
import { WalletInfo } from "./WalletInfo";
import { SendTx } from "./SendTx";

function App() {
  return (
    <div>
      <TonConnectButton />
      <AddressInfo />
      <WalletInfo />
      <SendTx />
    </div>
  );
}

export default App;
