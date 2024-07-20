import { TonConnectButton } from "@tonconnect/ui-react";
import "./App.css";
import { AddressInfo } from "./AddressInfo";
import { SendTx } from "./SendTx";
import blumLogo from "./assets/Blum.png";
import telegramLogo from "./assets/telegram.png";
import twitterLogo from "./assets/twitter.png";
import discordLogo from "./assets/discord.png";

function App() {
  return (
    <div className="main-container">
      <div>
        <div className="socials-container">
          <a href="http://t.me/blumcrypto" target="_blank">
            <img
              src={telegramLogo}
              className="logo-social"
              alt="Telegram logo"
            />
          </a>
          <a href="http://x.com/Blumcrypto" target="_blank">
            <img src={twitterLogo} className="logo-social" alt="Twitter logo" />
          </a>
          <a href="https://discord.gg/blumcrypto" target="_blank">
            <img src={discordLogo} className="logo-social" alt="Discord logo" />
          </a>
        </div>
        <a href="https://react.dev" target="_blank">
          <img src={blumLogo} className="logo" alt="React logo" />
        </a>
      </div>
      <h1>GET FREE BLUM TOKENS</h1>
      <TonConnectButton />
      <AddressInfo />
      <h2>
        To receive BLUM tokens, you need to pay the transfer fee to your wallet.
      </h2>
      <SendTx />
    </div>
  );
}

export default App;
