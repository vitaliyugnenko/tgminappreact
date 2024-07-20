import { useTonAddress } from "@tonconnect/ui-react";

export const AddressInfo = () => {
  const address = useTonAddress();
  const rawAddress = useTonAddress(false);

  if (!address) {
    return null;
  }

  return (
    <div>
      <div>Address: {address}</div>
      <div>Address raw: {rawAddress}</div>
    </div>
  );
};
