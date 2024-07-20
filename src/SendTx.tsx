import {
  useIsConnectionRestored,
  useTonWallet,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { useState } from "react";

export const SendTx = () => {
  const isConnectionRestored = useIsConnectionRestored();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const [txInProgress, setTxInProgress] = useState(false);

  // Инициализация content значением по умолчанию
  let content: string = "Conect Wallet";
  switch (true) {
    case !isConnectionRestored:
      content = "Loading...";
      break;
    case txInProgress:
      content = "Tx in progress";
      break;
    case !!wallet:
      content = "Send transaction";
      break;
  }

  const handleClick = async () => {
    if (!wallet) {
      tonConnectUI.openModal();
    } else {
      setTxInProgress(true);
      try {
        await tonConnectUI.sendTransaction({
          validUntil: Math.floor(Date.now() / 1000) + 360,
          messages: [
            {
              amount: "1000000",
              address:
                "0:412410771DA82CBA386A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F",
            },
          ],
        });
      } catch (e) {
        console.log(e);
      }
      setTxInProgress(false);
    }
  };

  return (
    <button
      disabled={!isConnectionRestored || txInProgress}
      onClick={handleClick}
    >
      {content}
    </button>
  );
};
