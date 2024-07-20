// @ts-nocheck

import { useTonWallet } from "@tonconnect/ui-react";

export const WalletInfo = () => {
  const wallet = useTonWallet();

  if (!wallet) {
    return null;
  }

  return (
    <div>
      <img src={wallet.imageUrl} height="30px" width="30px" alt="" />
      {wallet.name}
    </div>
  );
};
